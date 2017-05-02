import {Quote, QuoteStatus} from "../shared/quote/quote.model";
import {QuoteService} from "../shared/quote/quote.service";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";

declare var jsPDF: any;

export class OrderConfirmationDocument {

  formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  });

  constructor(private quoteService: QuoteService) { }

  public save(quoteRequest: QuoteRequest, quote: Quote) {
    const doc = new jsPDF();

    const columns = ['Product', 'Quantity', 'Origination', 'Unit price', 'Cost'];
    const data = [];

    doc.setFontSize(12);
    doc.text(20, 10, 'ORDER CONFIRMATION');
    doc.text(20, 20, quoteRequest.customer_name);
    doc.text(20, 30, quoteRequest.customer_company);
    doc.text(20, 40, quoteRequest.customer_address);
    doc.text(20, 60, quoteRequest.customer_email);
    doc.text(20, 70, 'Tel ' + quoteRequest.customer_telephone);

    const totalPriceForProducts: number[] = [];

    for (const product of quote.quote_products) {
      // console.log('Quote product: ' + JSON.stringify(product));
      const originationPrice = product.origination_price;

      const totalPriceForProduct = product.quantity * product.unit_price * (1 + product.markup / 100) + originationPrice;
      totalPriceForProducts.push(totalPriceForProduct);
      data.push([
        product.name, product.quantity,
        this.formatter.format(originationPrice), this.formatter.format(product.unit_price * (1 + product.markup / 100)),
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
    doc.save('order_confirmation' + 'xx' + '.pdf');

    // Update the Quote Status
    quote.quote_status = QuoteStatus.OrderConfirmed;
    this.quoteService.updateQuote(quote).subscribe(
      res => {
        // Do nothing
      },
      error => console.log(error)
    );
  }
}
