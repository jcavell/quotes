import {Component, Input} from "@angular/core";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Quote} from "../shared/quote/quote.model";
import {QuoteService} from "../shared/quote/quote.service";
import {QuoteDocument} from "./quoteDocument";
import {PurchaseOrderDocument} from "./purchaseOrderDocument";
import {InvoiceDocument} from "./invoiceDocument";
// import jsPDF from 'jspdf';
declare var jsPDF: any;

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

  constructor(private quoteService: QuoteService) { }

  public download() {
    if (this.documentType === 'quote') {
      new QuoteDocument(this.quoteService).save(this.quoteRequest, this.quote);
    } else if (this.documentType === 'purchase_order') {
      new PurchaseOrderDocument(this.quoteService).save(this.quoteRequest, this.quote);
    } else if (this.documentType === 'invoice') {
      new InvoiceDocument(this.quoteService).save(this.quoteRequest, this.quote);
    }
  }
}
