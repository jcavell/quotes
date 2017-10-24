import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Company} from "../shared/company/company.model";
import {CompanyService} from "../shared/company/company.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {Customer} from "../shared/customer/customer.model";
import {CustomerService} from "../shared/customer/customer.service";
import _ from "lodash";
import {Address} from "../shared/address/address.model";
import {AddressService} from "../shared/address/address.service";
import {CustomerRecord} from "../shared/customer/customerRecord.model";
import {isNullOrUndefined} from "util";


@Component({
  selector: 'edit-customer',
  templateUrl: './editCustomerComponent.html'
})
export class EditCustomerComponent implements OnInit {
  private modalRef: NgbModalRef;
  @Input() customerRecord: CustomerRecord;
  @Output() onCustomerCreated = new EventEmitter<CustomerRecord>();

  customer: Customer;
  company: Company;
  invoiceAddress: Address;
  deliveryAddress: Address;

  companies: Company[];

  constructor(private modalService: NgbModal,
              public companyService: CompanyService,
              public customerService: CustomerService,
              public addressService: AddressService) {
  }

  ngOnInit() {
    this.customer = _.clone(this.customerRecord.customer);
    this.company =  _.clone(this.customerRecord.company);

    this.invoiceAddress = isNullOrUndefined(this.customerRecord.invoiceAddress) ? new Address() : _.clone(this.customerRecord.invoiceAddress);
    this.deliveryAddress = isNullOrUndefined(this.customerRecord.deliveryAddress) ? new Address() : _.clone(this.customerRecord.deliveryAddress);

    this.customerRecord.alerts = [];
    this.getCompanies();

    console.log("After ngOnInit, company is: " + JSON.stringify(this.company));
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => {
        if (term.length < 2) {
          return [];
        } else {
          const matchingCompanies = this.companies.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
          if (matchingCompanies.length > 0) {
            return matchingCompanies;
          } else {
            return [new Company(undefined, term, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, true)];
          }
        }})

  inputFormatter = (c: Company) => c.name;
  resultFormatter = (c: Company) => c.name + (c.id ? "" : " (new)");

  open(content) {
    this.modalRef = this.modalService.open(content, {size: 'lg'});
  }

  upsertInvoiceAddress(): Observable<Address>  {
    return _.isEqual(this.customerRecord.invoiceAddress, this.invoiceAddress ) ||
            isNullOrUndefined(this.invoiceAddress.name) ?
      Observable.of(this.invoiceAddress) :
      this.addressService.upsertAddress(this.invoiceAddress);
  }

  upsertDeliveryAddress(): Observable<Address> {
    return _.isEqual(this.customerRecord.deliveryAddress, this.deliveryAddress) ||
    isNullOrUndefined(this.deliveryAddress.name) ?
      Observable.of(this.deliveryAddress) :
      this.addressService.upsertAddress(this.deliveryAddress);
  }

  upsertCompany(): Observable<Company> {
    console.log("WILL UPSERT " + JSON.stringify(this.company));
    return _.isEqual(this.customerRecord.company, this.company) ?
      Observable.of(this.company) :
      this.companyService.upsertCompany(this.company);
  }

  upsertCustomer(): Observable<Customer> {
    return this.customer.isEmpty()  || this.customerRecord.isEqual(this.customer, this.company, this.invoiceAddress, this.deliveryAddress) ?
      Observable.of(this.customer) :
      this.customerService.upsertCustomer(this.customer);
  }


  updateAll() {
    this.upsertInvoiceAddress().concatMap(a => {
      this.customer.invoiceAddressId = a.id;
      return this.upsertDeliveryAddress();
    }).
    concatMap(a => {
      this.customer.deliveryAddressId = a.id;
      return this.upsertCompany();
    }).
    concatMap(c => {
      this.customer.companyId = c.id;
      this.customerRecord.company = _.clone(c);
      return this.upsertCustomer();
    }).subscribe(
      customer => {
        let upsertMessage = 'Updated customer';
        if (!_.isEqual(this.customer, this.customerRecord.customer)) {
          if (this.customerRecord.customer.id === undefined) {
            // new customer
            this.onCustomerCreated.emit(this.customerRecord);
            upsertMessage = 'Inserted new customer';
          }
          this.customerRecord.alerts.push({
            id: this.customerRecord.alerts.length + 1,
            type: 'success',
            message: upsertMessage
          });
        }
        this.customerRecord.customer = _.clone(customer);
      },
      error => {
        this.customerRecord.alerts.push({
          id: this.customerRecord.alerts.length + 1,
          type: 'success',
          message: 'ERROR updating customer: ' + JSON.stringify(error)
        });
      }
    );
    this.modalRef.close();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      companies => {
        this.companies = companies;
      },
      error => console.log(error)
    );
  }
}
