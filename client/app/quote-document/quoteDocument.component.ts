import {Component, Input} from "@angular/core";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Quote, QuoteProduct} from "../shared/quote/quote.model";
import {QuoteService} from "../shared/quote/quote.service";
// import jsPDF from 'jspdf';
declare var jsPDF: any;

@Component({
  selector: 'download-quote',
  template: `
 <button class='btn btn-primary' (click)='download()'><i class='fa fa-download'></i> {{buttonName}}</button> 
`
})
export class QuoteDocumentComponent {
  @Input() quote: Quote;
  @Input() quoteRequest: QuoteRequest;
  @Input() buttonName = 'Download quote';

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

  public download() {
    const doc = new jsPDF();

    const columns = ['Product', 'Quantity', 'Origination', 'Unit price', 'Cost'];
    const data = [];

    // doc.setFontType('bold')
    // doc.text(20, 20, 'FAO ' + this.quoteRequest.customer_name);

    const includedProducts = this.quote.quote_products.filter(prod => prod.is_included);

    const totalPriceForProducts: number[] = [];

    for (const product of includedProducts) {
      // console.log('Quote product: ' + JSON.stringify(product));
      const originationPrice = product.origination_price;
      this.setUnitPrice(product);
      const totalPriceForProduct = product.quantity * product.unit_price + originationPrice;
      totalPriceForProducts.push(totalPriceForProduct);
      data.push([
        product.name, product.quantity,
        this.formatter.format(originationPrice), this.formatter.format(product.unit_price),
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

    // Save the new Quote
    this.quoteService.addQuote(this.quote).subscribe(
      res => {
        // Do nothing
      },
      error => console.log(error)
    );
  }
}
