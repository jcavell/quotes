import {Component, OnDestroy, OnInit} from "@angular/core";
import {Enquirieservice} from "../shared/enquiry/enquiry.service";
import {NQuoteWithProducts} from "../shared/enquiry/enquiry.model";
import {SelectedEnquiryService} from "../shared/enquiry/selectedEnquiry.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'sd-rep',
  templateUrl: 'enquiries.component.html',
  styleUrls: ['./enquiries.component.scss']
})

export class EnquiriesComponent implements OnInit, OnDestroy {
  enquiries: NQuoteWithProducts[];
  selectedEnquiry: NQuoteWithProducts;
  errorMessage: string;
  isEditing = false;
  subscription: Subscription;
  queryParams: {}

  constructor(private activatedRoute: ActivatedRoute, public enquirieservice: Enquirieservice, public selectedEnquirieservice: SelectedEnquiryService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.queryParams = queryParams;
    });

    this.subscription = this.selectedEnquirieservice.isEditing$.subscribe(isEditing => {
      this.isEditing = isEditing;
    });

    this.selectedEnquirieservice.selectedEnquiry$.subscribe(enquiry => {
      console.log(`ngOnInit: Setting selected enquiry to ${JSON.stringify(enquiry)}`);
      this.selectedEnquiry = enquiry;
    });

    this.getEnquiries();
  }

  ngOnDestroy() {
    this.selectedEnquirieservice.setEditing(false);
    this.subscription.unsubscribe();
    this.selectedEnquiry = undefined;
    this.selectedEnquirieservice.changeEnquiry(undefined);
  }

  /*
   Quote button clicked - inform listeners and set edit mode
   */
  displaySelectedEnquiry(event: Event, enquiry: NQuoteWithProducts) {
    console.log('Changing selected enquiry');
    this.selectedEnquirieservice.changeEnquiry(enquiry);
    this.selectedEnquirieservice.setEditing(true);
  }

  /*
   Called from ngOnInit, get all new enquiries
   */
  getEnquiries(): boolean {
    this.enquirieservice.getNew(this.queryParams)
      .subscribe(
        nquotes => {
          this.enquiries = nquotes.quotes;
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
