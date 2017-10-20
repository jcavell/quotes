import {Component, Input, OnInit} from "@angular/core";

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
    this.customerRecord.alerts = [];
    this.getCompanies();
    this.company = _.clone(this.customerRecord.company);
    this.customer = _.clone(this.customerRecord.customer);
    this.invoiceAddress = isNullOrUndefined(this.customerRecord.invoiceAddress) ? new Address() : _.clone(this.customerRecord.invoiceAddress);
    this.deliveryAddress = isNullOrUndefined(this.customerRecord.deliveryAddress) ? new Address() : _.clone(this.customerRecord.deliveryAddress);
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.companies.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  resultFormatter = (c: Company) => c.name;

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

  updateCompany(): Observable<Company> {
    return _.isEqual(this.customerRecord.company, this.company) ?
      Observable.of(this.company) :
      this.companyService.editCompany(this.company);
  }

  updateCustomer(): Observable<Customer> {
    return _.isEqual(this.customerRecord.customer, this.customer) &&
    _.isEqual(this.customerRecord.invoiceAddress, this.invoiceAddress) &&
    _.isEqual(this.customerRecord.deliveryAddress, this.deliveryAddress) &&
    _.isEqual(this.customerRecord.company, this.company) ?
      Observable.of(this.customer) :
      this.customerService.editCustomer(this.customer);
  }


  updateAll() {
    this.upsertInvoiceAddress().flatMap(a => {
      this.customer.invoiceAddressId = a.id;
      return this.upsertDeliveryAddress();
    }).
    flatMap(a => {
      this.customer.deliveryAddressId = a.id;
      return this.updateCompany();
    }).
    flatMap(c => {
      this.customer.companyId = c.id;
      this.customerRecord.company = _.clone(c);
      console.log('Updated company ' + JSON.stringify(c));
      return this.updateCustomer();
    }).subscribe(
      customer => {
        if (!_.isEqual(this.customer, this.customerRecord.customer)) {
          this.customerRecord.alerts.push({
            id: this.customerRecord.alerts.length + 1,
            type: 'success',
            message: 'Updated customer'
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
      companies => this.companies = companies,
      error => console.log(error)
    );
  }
}
