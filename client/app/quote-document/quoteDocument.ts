import {Quote, QuoteProduct, QuoteStatus} from "../shared/quote/quote.model";
import {QuoteService} from "../shared/quote/quote.service";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";

declare var jsPDF: any;

export class QuoteDocument {

  formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  });

  constructor(private quoteService: QuoteService) {
  }

  private setUnitPrice(quoteProduct: QuoteProduct) {
    let priceKey: number;
    if (quoteProduct.quantity <= 999) {
      priceKey = 500;
    } else if (quoteProduct.quantity <= 1999) {
      priceKey = 1000;
    } else if (quoteProduct.quantity <= 4999) {
      priceKey = 2000;
    } else if (quoteProduct.quantity <= 9999) {
      priceKey = 5000;
    } else {
      priceKey = 10000;
    }
    quoteProduct.unit_price = quoteProduct.prices[priceKey];
  }

  public save(quoteRequest: QuoteRequest, quote: Quote) {
    const doc = new jsPDF();

    const columns = ['Product', 'Quantity', 'Origination', 'Unit price', 'Cost'];
    const data = [];

    doc.setFontSize(12);
    doc.text(20, 10, 'QUOTE');
    doc.text(20, 20, quoteRequest.customer_name);
    doc.text(20, 30, quoteRequest.customer_company);
    doc.text(20, 40, quoteRequest.customer_address);
    doc.text(20, 60, quoteRequest.customer_email);
    doc.text(20, 70, 'Tel ' + quoteRequest.customer_telephone);

    const totalPriceForProducts: number[] = [];

    for (const product of quote.quote_products) {
      // console.log('Quote product: ' + JSON.stringify(product));
      const originationPrice = product.origination_price;
      this.setUnitPrice(product);
      const totalPriceForProduct = product.quantity * product.unit_price * (1 + product.markup / 100) + originationPrice;
      totalPriceForProducts.push(totalPriceForProduct);
      data.push([
        product.name, product.quantity,
        this.formatter.format(originationPrice),
        this.formatter.format(product.unit_price * (1 + product.markup / 100)),
        this.formatter.format(totalPriceForProduct)
      ]);
    }

    // Total price
    const totalPrice = totalPriceForProducts.reduce((total, price) => total += price);
    const vat = totalPrice * 0.2;
    const totalPriceWithVat = totalPrice + vat;

    data.push(['Total', '', '', '', this.formatter.format(totalPrice)]);
    data.push(['VAT @20%', '', '', '', this.formatter.format(vat)]);
    data.push(['Total incl. VAT', '', '', '', this.formatter.format(totalPriceWithVat)]);

    doc.autoTable(columns, data,  {startY: 80});

    // Save the PDF
    doc.save('quote_' + 'xxxx' + '.pdf');

    // Save the new Quote
    quote.quote_status = QuoteStatus.Quoted;
    this.quoteService.addQuote(quote).subscribe(
      res => {
        // Do nothing
      },
      error => console.log(error)
    );
  }
}
