import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {ToastComponent} from "../shared/toast/toast.component";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {QuoteService} from "../shared/quote/quote.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-quote',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  quotes = [];
  isLoading = true;

  addQuoteForm: FormGroup;
  quote_request_id = new FormControl('', Validators.required);
  quote_created = new FormControl('', Validators.required);

  constructor(private http: Http,
              private quoteService: QuoteService,
              private quoteRequestService: QuoteRequestService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getQuotesAndQuoteRequest();

    this.addQuoteForm = this.formBuilder.group({
      quote_request_id: this.quote_request_id,
      quote_created: this.quote_created,
    });
  }


  combineQuotesAndQuoteRequests(): Observable<any> {
    const combined = this.quoteService.getQuotes().combineLatest(this.quoteRequestService.getNew(),
      (quotes, quoteRequests) => {
            return quotes.map(quote => [quote, quoteRequests.find(qr => qr.id == quote.quote_request_id)]);
      });
    return combined;
  }

  getQuotesAndQuoteRequest() {
    this.combineQuotesAndQuoteRequests().subscribe(
      data => {
        this.quotes = data;
        // console.log(`Quotes: ${JSON.stringify(data)}`);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
}
