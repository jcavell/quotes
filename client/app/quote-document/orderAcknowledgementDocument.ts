import {ASIQuote, QuoteStatus} from "../shared/quote/quote.model";
import {QuoteService} from "../shared/quote/quote.service";
import {NQuote} from "../shared/quote-request/quoteRequest.model";

declare var jsPDF: any;

export class OrderAcknowledgementDocument {

  formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  });

  constructor(private quoteService: QuoteService) { }

  public save(quoteRequest: NQuote, quote: ASIQuote) {
    const doc = new jsPDF();

    const columns = ['Product', 'Quantity', 'Origination', 'Unit price', 'Cost'];
    const data = [];

    doc.setFontSize(12);
    doc.text(20, 10, 'ORDER ACKNOWLEDGEMENT');
    doc.text(20, 20, quoteRequest.requestCustomerName);
    doc.text(20, 30, quoteRequest.requestCompany);
    doc.text(20, 40, 'quoteRequest.customer_address needs to be added');
    doc.text(20, 60, quoteRequest.requestCustomerEmail);
    doc.text(20, 70, 'Tel ' + quoteRequest.requestCustomerTel);

    const totalPriceForProducts: number[] = [];

    for (const product of quote.quote_products) {
      // console.log('Quote product: ' + JSON.stringify(product));
      const originationPrice = 0;

      const totalPriceForProduct = product.getMarkedUpTotalCost() + originationPrice;
      totalPriceForProducts.push(totalPriceForProduct);
      data.push([
        product.name, product.quantity,
        this.formatter.format(originationPrice), this.formatter.format(product.getMarkedUpUnitCost()),
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
    doc.save('order_acknowledgement' + 'xx' + '.pdf');

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
