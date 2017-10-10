import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {ToastComponent} from "../shared/toast/toast.component";
import {EnquiryService} from "../shared/enquiry/enquiry.service";
import {ASIQuoteService} from "../shared/asiquote/ASIQuote.service";
import {Observable, Subscription} from "rxjs";
import {OldQuote, QuoteStatus} from "../shared/asiquote/ASIQuote.model";
import {SelectedASIQuoteService} from "../shared/asiquote/selectedASIQuote.service";
import {Enquiry} from "../shared/enquiry/enquiry.model";
import {Auth} from "../shared/auth/auth.service";

@Component({
  selector: 'app-quote',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {

  enquiriesAndQuotes: [[Enquiry, OldQuote]];
  isLoading = true;
  selectedQuote: OldQuote;
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
    return this.enquiriesAndQuotes.filter(
      enquiryAndQuote => enquiryAndQuote[1].quote_status === status).length;
  }

  constructor(private http: Http,
              private auth: Auth,
              private quoteService: ASIQuoteService,
              private enquiryService: EnquiryService,
              private selectedQuoteService: SelectedASIQuoteService,
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

    this.getEnquiryAndQuoteTuples();

    this.addQuoteForm = this.formBuilder.group({
      quote_request_id: this.quote_request_id,
      quote_created: this.quote_created,
    });
  }


  combineQuotesAndEnquiries(): Observable<[[Enquiry, OldQuote]]> {
    const combined = this.quoteService.getQuotes().combineLatest(this.enquiryService.getNew({}),
      (quotes, enquiries) => {
            return quotes.map(quote => [enquiries.find(qr => qr.id === quote.quote_request_id), quote]);
      });
    return combined;
  }

  displaySelectedQuote(event: Event, selectedEnquiryAndQuote: [Enquiry, OldQuote]) {
    this.selectedQuoteService.changeQuote(selectedEnquiryAndQuote);
    this.selectedQuote = selectedEnquiryAndQuote[1];
    this.selectedQuoteService.setEditing(true);
  }

  getEnquiryAndQuoteTuples() {
    this.combineQuotesAndEnquiries().subscribe(
      data => {
        this.enquiriesAndQuotes = data;
        // console.log(`Quotes: ${JSON.stringify(data)}`);
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }
}
