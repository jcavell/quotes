import {Component, Input} from "@angular/core";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Quote} from "../shared/quote/quote.model";
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
  @Input() quote: Quote;
  @Input() quoteRequest: QuoteRequest;
  @Input() buttonName = 'Create quote';
  @Input() documentType = 'quote';

  productImages: Array<[string, any]> = new Array();

  constructor(private quoteService: QuoteService, private http: Http) {
  }

  public download() {

    if (this.documentType === 'quote') {
    const obs = this.quote.quote_products.map((product, index) => this.getProductImage(product.image_url));

    Observable.forkJoin(obs).subscribe(
      imageGets => {
        imageGets.forEach((imageGet, index) => {
          const contentType = imageGet.headers.get('Content-Type');
          const img = new Image();
          img.src = imageGet.url;
          img.crossOrigin = 'Anonymous';
          img.addEventListener('load', () => {
            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            // canvas.width = img.width;
            // canvas.height = img.height;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL(contentType);
            this.productImages[index] = [contentType, dataURL];
            console.log(`Added product image ${imageGet.url}`);

            if (index === imageGets.length - 1) {
              console.log(`*** Creating document with images ${JSON.stringify(this.productImages)}`);
              new QuoteDocument(this.quoteService).save(this.quoteRequest, this.quote, this.productImages);
            }
          });
        });

      },
      error => {
        console.log('ERROR: ' + error);
      },
      () => {
      }
    );


    // this.quote.quote_products.map((product, index) => {
    //   this.getProductImage(product.image_url).subscribe(
    //     headersAndBody => {
    //       const contentType = headersAndBody[0].get('Content-Type');
    //       const img = new Image();
    //       img.src = product.image_url;
    //       img.crossOrigin = 'Anonymous';
    //       img.addEventListener('load', () => {
    //         const canvas = document.createElement('canvas') as HTMLCanvasElement;
    //         // canvas.width = img.width;
    //         // canvas.height = img.height;
    //         const context = canvas.getContext('2d');
    //         context.drawImage(img, 0, 0);
    //         const dataURL = canvas.toDataURL(contentType);
    //
    //         this.productImages[index] = [contentType, dataURL];
    //       });
    //     },
    //     error => console.log(`ERROR getting image for product ${JSON.stringify(product)} ${error}`)
    //   );
    // });

    } else if (this.documentType === 'order_acknowledgement') {
      new OrderAcknowledgementDocument(this.quoteService).save(this.quoteRequest, this.quote);
    } else if (this.documentType === 'invoice') {
      new InvoiceDocument(this.quoteService).save(this.quoteRequest, this.quote);
    }
  }

  public getProductImage(url: string): Observable<ImageGet> {
    return this.http.get(url, {responseType: ResponseContentType.Blob})
      .map(res => {
        return new ImageGet(url, res.headers, res.blob());
      });
  }
}

