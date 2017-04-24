import {Component, Input} from "@angular/core";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Quote, QuoteProduct} from "../shared/quote/quote.model";
// import jsPDF from 'jspdf';
declare var jsPDF: any;

// const autoTable = require('jspdf-autotable/dist/jspdf.plugin.autotable');

@Component({
  selector: 'download-quote',
  template: `
 <button class="btn btn-primary" (click)="download()"><i class="fa fa-download"></i> Download quote</button> 
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

  constructor() {
  }

  private retrieveUnitPrice(quoteProduct: QuoteProduct): number {
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

    return quoteProduct.prices[priceKey];
  }

  public download() {
    const doc = new jsPDF();

    const columns = ["Product", "Quantity", "Origination", "Unit price", "Total"];
    const data = [];

    // doc.setFontType('bold')
    // doc.text(20, 20, 'FAO ' + this.quoteRequest.customer_name);

    const includedProducts = this.quote.quote_products.filter(prod => prod.is_included);

    const totalPriceForProducts: number[] = [];

    let counter: string;
    for (counter in includedProducts) {
      const i = parseInt(counter); // TODO do this better

      // const startingRowPosition = 50 * i;
      const product = includedProducts[i];
      console.log('Quote product: ' + JSON.stringify(product));

      // doc.setFontType('normal');
      // doc.text(20, 40 + startingRowPosition, product.name);
      // doc.addPage();

      const originationPrice = product.origination_price;
      const unitPrice = this.retrieveUnitPrice(product);
      const totalPriceForProduct = product.quantity * unitPrice + originationPrice;
      totalPriceForProducts.push(totalPriceForProduct);
      // doc.text(20, 50 + startingRowPosition, `Set up costs: ${this.formatter.format(originationPrice)}`);
      // doc.text(20, 60 + startingRowPosition, `${product.quantity} @ ${this.formatter.format(unitPrice)} per unit`);
      // doc.setFontType('bold');
      // doc.text(20, 70 + startingRowPosition, '= ' + this.formatter.format(totalPriceForProduct));

      data.push([
        product.name, product.quantity,
        this.formatter.format(originationPrice), this.formatter.format(unitPrice),
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

    doc.autoTable(columns, data);

    // Save the PDF
    doc.save('quote_' + this.quote.id + '.pdf');
  }
}
