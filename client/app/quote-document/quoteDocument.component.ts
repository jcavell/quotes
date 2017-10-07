import {Component, Input} from "@angular/core";
import {NQuoteWithProducts} from "../shared/enquiry/enquiry.model";
import {ASIQuote} from "../shared/quote/quote.model";
import {QuoteService} from "../shared/quote/quote.service";
import {QuoteDocument} from "./quoteDocument";
import {OrderAcknowledgementDocument} from "./orderAcknowledgementDocument";
import {InvoiceDocument} from "./invoiceDocument";
import {Headers, Http, ResponseContentType} from "@angular/http";
import {Observable} from "rxjs";
// import jsPDF from 'jspdf';
declare var jsPDF: any;


class ImageGet {
  constructor(public url: string,
              public headers: Headers,
              public blob: Blob) {
  }
}

@Component({
  selector: 'download-quote',
  template: `
 <button class='btn btn-sm btn-primary' (click)='download()'><i class='fa fa-download'></i> {{buttonName}}</button> 
`
})
export class QuoteDocumentComponent {
  @Input() quote: ASIQuote;
  @Input() enquiry: NQuoteWithProducts;
  @Input() buttonName = 'Create quote';
  @Input() documentType = 'quote';


  processedImages = 0;
  productImages: Array<[string, any]> = new Array();

  constructor(private quoteService: QuoteService, private http: Http) {
  }

  public download() {

    if (this.documentType === 'quote') {
      const quoteDocument = new QuoteDocument(this.quoteService);
      quoteDocument.save(this.enquiry.quote, this.quote, this.productImages);
      // this.quoteService.sendQuoteEmail(this.quote).subscribe(
      //   (data) => console.log(data));
    } else if (this.documentType === 'order_acknowledgement') {
      new OrderAcknowledgementDocument(this.quoteService).save(this.enquiry.quote, this.quote);
    } else if (this.documentType === 'invoice') {
      new InvoiceDocument(this.quoteService).save(this.enquiry.quote, this.quote);
    }

    //
    // this.quote.quote_products.map(
    //   (product, index) => {
    //
    //     const image_url = 'http://localhost:1337/' + encodeURI(product.image_url);
    //     const contentType = 'image/jpeg';
    //     const img = new Image();
    //     img.crossOrigin = 'Anonymous';
    //     img.src = image_url;
    //     console.log('Image src: ' + img.src);
    //     img.addEventListener('load', () => {
    //         const canvas = document.createElement('canvas') as HTMLCanvasElement;
    //         const context = canvas.getContext('2d');
    //         context.drawImage(img, 0, 0);
    //         const dataURL = canvas.toDataURL(contentType);
    //         this.productImages[index] = [contentType, dataURL];
    //
    //       this.processedImages++;
    //
    //         console.log(`Added product image ${image_url} to index ${index} and this.processedImages === this.quote.quote_products.length = ${this.processedImages === this.quote.quote_products.length} and this.productImages[${index}] = ${this.productImages[index]} and it should be ${dataURL}`);
    //
    //         if (this.processedImages === this.quote.quote_products.length) {
    //           console.log(`*** Creating document with images ${JSON.stringify(this.productImages)}`);
    //           if (this.documentType === 'quote') {
    //             new QuoteDocument(this.quoteService).save(this.enquiry, this.quote, this.productImages);
    //           } else if (this.documentType === 'order_acknowledgement') {
    //             new OrderAcknowledgementDocument(this.quoteService).save(this.enquiry, this.quote);
    //           } else if (this.documentType === 'invoice') {
    //             new InvoiceDocument(this.quoteService).save(this.enquiry, this.quote);
    //           }
    //         }
    //       }
    //     );
    //     return 5;
    //   }
    // );
  }

  public getProductImage(url: string): Observable<ImageGet> {
    return this.http.get(url, {responseType: ResponseContentType.Blob})
      .map(res => {
        return new ImageGet(url, res.headers, res.blob());
      });
  }
}

