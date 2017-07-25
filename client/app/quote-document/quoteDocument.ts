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

  public save(quoteRequest: QuoteRequest, quote: Quote, productImages: Array<[string, any]>) {
    const doc = new jsPDF();

    const columns = ['Product', 'Quantity', 'Origination', 'Unit price', 'Price (pre VAT)', 'VAT', 'Price (incl. VAT)'];
    const data = [];

    doc.setFontSize(12);
    doc.text(20, 10, 'QUOTE');
    doc.text(20, 20, quoteRequest.customer_name);
    doc.text(20, 30, quoteRequest.customer_company);
    doc.text(20, 40, quoteRequest.customer_address);
    doc.text(20, 60, quoteRequest.customer_email);
    doc.text(20, 70, 'Tel ' + quoteRequest.customer_telephone);

    for (const product of quote.quote_products) {
      // console.log('Quote product: ' + JSON.stringify(product));
      const originationPrice = product.origination_price;
      this.setUnitPrice(product);
      const unitPrice = product.unit_price * (1 + product.markup / 100);
      const preVatTotal = product.quantity * unitPrice + originationPrice;
      const vat = preVatTotal * 0.2;
      const totalInclVat = preVatTotal + vat;

      data.push([product.name, product.quantity,
        this.formatter.format(originationPrice),
        this.formatter.format(unitPrice),
        this.formatter.format(preVatTotal),
        this.formatter.format(vat),
        this.formatter.format(totalInclVat)
      ]);
    }

    doc.autoTable(columns, data, {
      startY: 80, tableWidth: 'auto', styles: {
        cellPadding: 1, // a number, array or object (see margin below)
        fontSize: 8,
        font: "helvetica", // helvetica, times, courier
        lineColor: 200,
        lineWidth: 0,
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        overflow: 'linebreak', // visible, hidden, ellipsize or linebreak
        fillColor: false, // false for transparent or a color as described below
        textColor: 20,
        halign: 'left', // left, center, right
        valign: 'middle', // top, middle, bottom
        columnWidth: 'auto' // 'auto', 'wrap' or a number
      },
      drawRow: function (row, d) {row.height  = 20}
    });

    // quote.quote_products.forEach((product, index) => {
    //  console.log(`Attempting to add image ${JSON.stringify(productImages[index])}`);
    //   doc.addImage(productImages[index][1], productImages[index][0], 15, 89 + (index * 20), 20, 20);
    // });

    // Save the PDF
    doc.save('quote_' + 'xxxx' + '.pdf');

    this.quoteService.sendQuoteEmail(quote, doc.output()).subscribe(
      (data) => console.log(data));

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
