import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {QuoteService} from "../shared/quote/quote.service";
import {QuoteRecord} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {Subject, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IAlert} from "../shared/customer/customer.alert";
import {Refresher} from "../customer/refresher";

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
  searchTerm$ = new Subject<string>();
  private _page: number;
  private searchParams;
  count: number;

  constructor(private activatedRoute: ActivatedRoute,
              public quoteService: QuoteService,
              public selectedQuoteService: SelectedQuoteService,
              private _router: Router
  ) {}


  @Input() set page(pageNum: number) {
    if (!isNaN(pageNum)) {
      this._page = pageNum;
      this.getQuotes();
    }
  }

  get page(): number {
    return this._page;
  }

  ngOnInit() {
    new Refresher(this._router);

    this.searchParams = {};

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
    this.search();
  }

  private search() {
    return this.quoteService.search(this.searchTerm$, this.searchParams)
      .subscribe(quoteRecords => {
        this.quoteRecords = quoteRecords[0];
        this.count = quoteRecords[0].length ? quoteRecords[1] : 0;
        this._page = quoteRecords[1] ? 1 : undefined;
      });
  }

  getQuotes(): boolean {
    this.quoteService.getQuoteRecords(this.searchParams, this._page)
      .subscribe(
        qr => {
          this.quoteRecords = qr;
        },
        error => this.errorMessage = <any>error
      );
    return false;
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



  getCompanyName(quoteRecord: QuoteRecord) {
    return quoteRecord.customerRecord ? quoteRecord.customerRecord.company.name : quoteRecord.enquiry.company;
  }

  getCustomerName(quoteRecord: QuoteRecord) {
    return quoteRecord.customerRecord ? quoteRecord.customerRecord.customer.name : quoteRecord.enquiry.customerName;
  }

  getCustomerEmail(quoteRecord: QuoteRecord) {
    return quoteRecord.customerRecord ? quoteRecord.customerRecord.customer.email : quoteRecord.enquiry.customerEmail;
  }

  getCustomerDirectPhone(quoteRecord: QuoteRecord) {
    return quoteRecord.customerRecord ? quoteRecord.customerRecord.customer.directPhone : '';
  }

  getCustomerMobilePhone(quoteRecord: QuoteRecord) {
    return quoteRecord.customerRecord ? quoteRecord.customerRecord.customer.mobilePhone : quoteRecord.enquiry.customerTelephone;
  }

  alertCreated(alert: IAlert) {
    this.alert = alert;
  }

  public closeAlert() {
    this.alert = undefined;
  }
}
