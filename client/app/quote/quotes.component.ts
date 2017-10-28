import {Component, OnDestroy, OnInit} from "@angular/core";
import {QuoteService} from "../shared/quote/quote.service";
import {QuoteRecord} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {IAlert} from "../shared/customer/customer.alert";

@Component({
  moduleId: module.id,
  selector: 'sd-rep',
  templateUrl: 'quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})

export class QuotesComponent implements OnInit, OnDestroy {
  quoteRecords: QuoteRecord[];
  selectedQuoteRecord: QuoteRecord;
  errorMessage: string;
  isEditing = false;
  subscription: Subscription;
  queryParams: {};
  alert: IAlert;

  constructor(private activatedRoute: ActivatedRoute, public quoteService: QuoteService, public selectedQuoteService: SelectedQuoteService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.queryParams = queryParams;
    });

    this.subscription = this.selectedQuoteService.isEditing$.subscribe(isEditing => {
      this.isEditing = isEditing;
    });

      this.selectedQuoteService.selectedQuote$.subscribe(qr => {
      console.log(`ngOnInit: Setting selected quote to ${JSON.stringify(qr)}`);
      this.selectedQuoteRecord = qr;
    });

    this.getQuotes();
  }

  ngOnDestroy() {
    this.selectedQuoteService.setEditing(false);
    this.subscription.unsubscribe();
    this.selectedQuoteRecord = undefined;
    this.selectedQuoteService.changeQuote(undefined);
  }

  /*
   View quote button clicked - inform listeners and set edit mode
   */
  displaySelectedQuote(event: Event, qr: QuoteRecord) {
    console.log('Changing selected quote');
    this.selectedQuoteService.changeQuote(qr);
    this.selectedQuoteService.setEditing(true);
  }

  /*
   Called from ngOnInit, get all new quotes
   */
  getQuotes(): boolean {
    this.quoteService.getQuotes(this.queryParams)
      .subscribe(
        qr => {
          this.quoteRecords = qr;
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }

  alertCreated(alert: IAlert) {
    this.alert = alert;
  }

  public closeAlert() {
    this.alert = undefined;
  }
}
