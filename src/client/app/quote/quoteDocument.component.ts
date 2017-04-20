import {Component, Input} from "@angular/core";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Quote, QuoteProduct} from "../shared/quote/quote.model";
// import jsPDF from 'jspdf';
const jsPDF = require('jspdf/dist/jspdf.min');

@Component({
  selector: 'download-quote',
  template: `
        <button
          (click)="download()">Download quote
        </button>
        `
})

export class QuoteDocumentComponent {
  @Input() quote: Quote;
  @Input() quoteRequest: QuoteRequest;

  formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
});

  constructor() {}


  private retrieveUnitPrice(quoteProduct:QuoteProduct) : number {
    let priceKey: number;
    if (quoteProduct.quantity <= 999) priceKey = 500;
    else if (quoteProduct.quantity <= 1999) priceKey = 1000;
    else if (quoteProduct.quantity <= 4999) priceKey = 2000;
    else if (quoteProduct.quantity <= 9999) priceKey = 5000;
    else priceKey = 10000;

    return quoteProduct.prices[priceKey];
  }

  public download() {

    let doc = new jsPDF();
    doc.setFontType('bold')
    doc.text(20, 20, 'FAO ' + this.quoteRequest.customer_name);

    for(let i in this.quote.quote_products) {
      let quoteProduct = this.quote.quote_products[i];
      console.log('Quote product: ' + JSON.stringify(quoteProduct));

      doc.setFontType('normal')
      doc.text(20, 40 + (40 * i), quoteProduct.name);
      // doc.addPage();

      let unitPrice = this.retrieveUnitPrice(quoteProduct)
      let totalPrice = quoteProduct.quantity * unitPrice;
      doc.text(20, 50 + (40 * i), `${quoteProduct.quantity} @ ${this.formatter.format(unitPrice)} per unit`);
      doc.setFontType('bold');
      doc.text(20, 60 + (40 * i), '= ' + this.formatter.format(totalPrice));
    }

    // Save the PDF
    doc.save('quote_' + this.quote.id + '.pdf');
  }
}
