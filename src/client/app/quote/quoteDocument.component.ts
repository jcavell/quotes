import {Component, Input} from "@angular/core";
import {Product} from "../shared/product/product.model";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
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
  @Input() products: Product[];
  @Input() quoteRequest: QuoteRequest;

  formatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
});

  constructor() {
  }

  private pricing(product:Product) : [number, number] {
    let priceKey: number;
    let quantity = this.quoteRequest.quantity;
    if (quantity <= 999) priceKey = 500;
    else if (quantity <= 1999) priceKey = 1000;
    else if (quantity <= 4999) priceKey = 2000;
    else if (quantity <= 9999) priceKey = 5000;
    else priceKey = 10000;

    let unitPrice = product.prices[priceKey];
    return [unitPrice, quantity * unitPrice];
  }



  public download() {

    let doc = new jsPDF();
    doc.setFontType('bold')
    doc.text(20, 20, 'FAO ' + this.quoteRequest.customer_name);

    for(let i in this.products) {
      let product = this.products[i];

      doc.setFontType('normal')
      doc.text(20, 40 + (40 * i), product.name);
      // doc.addPage();

      let [unitPrice, totalPrice] = this.pricing(product);
      doc.text(20, 50 + (40 * i), `${this.quoteRequest.quantity} @ ${this.formatter.format(unitPrice)} per unit`);
      doc.setFontType('bold')
      doc.text(20, 60 + (40 * i), '= ' + this.formatter.format(totalPrice));
    }

    // Save the PDF
    doc.save('quote_' + this.quoteRequest.id + '.pdf');
  }
}
