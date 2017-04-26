import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {ToastComponent} from "../shared/toast/toast.component";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {QuoteService} from "../shared/quote/quote.service";
import {Observable, Subscription} from "rxjs";
import {Quote} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";

@Component({
  selector: 'app-quote',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  quoteRequestsAndQuotes: [[QuoteRequest, Quote]];
  isLoading = true;
  selectedQuote: Quote;
  isEditing: boolean;
  subscription: Subscription;


  addQuoteForm: FormGroup;
  quote_request_id = new FormControl('', Validators.required);
  quote_created = new FormControl('', Validators.required);

  constructor(private http: Http,
              private quoteService: QuoteService,
              private quoteRequestService: QuoteRequestService,
              private selectedQuoteService: SelectedQuoteService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.subscription = this.selectedQuoteService.isEditing$.subscribe(isEditing => {
        this.isEditing = isEditing;
      console.log('Changed isEditing to ' + this.isEditing);
      }
    );

    this.getQuoteRequestAndQuoteTuples();

    this.addQuoteForm = this.formBuilder.group({
      quote_request_id: this.quote_request_id,
      quote_created: this.quote_created,
    });
  }


  combineQuotesAndQuoteRequests(): Observable<[[QuoteRequest, Quote]]> {
    const combined = this.quoteService.getQuotes().combineLatest(this.quoteRequestService.getNew(),
      (quotes, quoteRequests) => {
            return quotes.map(quote => [quoteRequests.find(qr => qr.id == quote.quote_request_id), quote]);
      });
    return combined;
  }

  displaySelectedQuote(event: Event, selectedQuoteRequestAndQuote: [QuoteRequest, Quote]) {
    this.selectedQuoteService.changeQuote(selectedQuoteRequestAndQuote);
    this.selectedQuote = selectedQuoteRequestAndQuote[1];
    this.selectedQuoteService.setEditing(true);
  }

  getQuoteRequestAndQuoteTuples() {
    this.combineQuotesAndQuoteRequests().subscribe(
      data => {
        this.quoteRequestsAndQuotes = data;
        // console.log(`Quotes: ${JSON.stringify(data)}`);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
}
