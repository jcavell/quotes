import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {ToastComponent} from "../shared/toast/toast.component";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {QuoteService} from "../shared/quote/quote.service";
import {Observable, Subscription} from "rxjs";
import {Quote, QuoteStatus} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Auth} from "../shared/auth/auth.service";

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

  quoteStatus = QuoteStatus;

  displayStatuses = [1];
  shouldDisplay(status: number) {
    const doDisplay = this.displayStatuses.includes(status);
    // console.log(`Should display ${status}? ${doDisplay}`);
    return doDisplay;
  }
  toggleDisplayStatus(status: number) {
    if (this.shouldDisplay(status)) {
      this.displayStatuses.splice(this.displayStatuses.indexOf(status), 1);
    } else {
      this.displayStatuses.push(status);
    }
    // console.log(`Status: ${JSON.stringify(this.displayStatuses)}`);
  }

  getCount(status: number) {
    return this.quoteRequestsAndQuotes.filter(
      quoteRequestAndQuote => quoteRequestAndQuote[1].quote_status === status).length;
  }

  constructor(private http: Http,
              private auth: Auth,
              private quoteService: QuoteService,
              private quoteRequestService: QuoteRequestService,
              private selectedQuoteService: SelectedQuoteService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.subscription = this.selectedQuoteService.isEditing$.subscribe(isEditing => {
        this.isEditing = isEditing;
        if (!isEditing) {
          this.selectedQuote = undefined;
        }
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
