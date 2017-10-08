import {Component, OnDestroy, OnInit} from "@angular/core";
import {EnquiryService} from "../shared/enquiry/enquiry.service";
import {Enquiry} from "../shared/enquiry/enquiry.model";
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
  enquiries: Enquiry[];
  selectedEnquiry: Enquiry;
  errorMessage: string;
  isEditing = false;
  subscription: Subscription;
  queryParams: {};

  constructor(private activatedRoute: ActivatedRoute, public enquiryService: EnquiryService, public selectedEnquiryService: SelectedEnquiryService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.queryParams = queryParams;
    });

    this.subscription = this.selectedEnquiryService.isEditing$.subscribe(isEditing => {
      this.isEditing = isEditing;
    });

    this.selectedEnquiryService.selectedEnquiry$.subscribe(enquiry => {
      console.log(`ngOnInit: Setting selected enquiry to ${JSON.stringify(enquiry)}`);
      this.selectedEnquiry = enquiry;
    });

    this.getEnquiries();
  }

  ngOnDestroy() {
    this.selectedEnquiryService.setEditing(false);
    this.subscription.unsubscribe();
    this.selectedEnquiry = undefined;
    this.selectedEnquiryService.changeEnquiry(undefined);
  }

  /*
   View enquiry button clicked - inform listeners and set edit mode
   */
  displaySelectedEnquiry(event: Event, enquiry: Enquiry) {
    console.log('Changing selected enquiry');
    this.selectedEnquiryService.changeEnquiry(enquiry);
    this.selectedEnquiryService.setEditing(true);
  }

  /*
   Called from ngOnInit, get all new enquiries
   */
  getEnquiries(): boolean {
    this.enquiryService.getNew(this.queryParams)
      .subscribe(
        enquiries => {
          this.enquiries = enquiries;
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
