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

  updateMessage = 'Editing of customer cancelled';
  errorMessage = '';

  companies: Company[];

  constructor(private modalService: NgbModal,
              public companyService: CompanyService,
              public customerService: CustomerService,
              public addressService: AddressService) {
  }

  ngOnInit() {
    this.getCompanies();
    this.company = _.clone(this.customerRecord.company);
    this.customer = _.clone(this.customerRecord.customer);

    // if (this.invoiceAddress == null) {
    //   this.invoiceAddress = new Address(null, null, null, null, null, null, null, null, null, null, null, null);
    // } else {
      this.invoiceAddress = _.clone(this.customerRecord.invoiceAddress);
   // }

    // if (this.deliveryAddress == null) {
    //   this.deliveryAddress = new Address(null, null, null, null, null, null, null, null, null, null, null, null);
    // } else {
      this.deliveryAddress = _.clone(this.customerRecord.deliveryAddress);
   // }
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


  upsertInvoiceAddressPromise(): Observable<Address>  {
    return _.isEqual(this.customerRecord.invoiceAddress, this.invoiceAddress) ?
      Observable.of(this.invoiceAddress) :
      this.addressService.upsertAddress(this.invoiceAddress);
  }

  upsertDeliveryAddressPromise(): Observable<Address> {
    return _.isEqual(this.customerRecord.deliveryAddress, this.deliveryAddress) ?
      Observable.of(this.deliveryAddress) :
      this.addressService.upsertAddress(this.deliveryAddress);
  }

  updateCompanyPromise(): Observable<Company> {
    return _.isEqual(this.customerRecord.company, this.company) ?
      Observable.of(this.company) :
      this.companyService.editCompany(this.company);
  }

  updateCustomerPromise(): Observable<Customer> {
    return _.isEqual(this.customerRecord.customer, this.customer) &&
    _.isEqual(this.customerRecord.invoiceAddress, this.invoiceAddress) &&
    _.isEqual(this.customerRecord.deliveryAddress, this.deliveryAddress) &&
    _.isEqual(this.customerRecord.company, this.company) ?
      Observable.of(this.customer) :
      this.customerService.editCustomer(this.customer);
  }


  updateAll() {
    this.upsertInvoiceAddressPromise().flatMap((a) => {
      this.customer.invoiceAddressId = a.id;
      return this.upsertDeliveryAddressPromise();
    }).
    flatMap((a) => {
      this.customer.deliveryAddressId = a.id;
      return this.updateCompanyPromise();
    }).
    flatMap((c) => {
      this.customer.companyId = c.id;
      this.customerRecord.company = _.clone(c);
      console.log('Updated company ' + JSON.stringify(c));
      return this.updateCustomerPromise();
    }).subscribe(
      customer => {
        this.customerRecord.customer = customer;
        console.log('Updated customer ' + JSON.stringify(customer));
      },
      error => {
        console.log('ERROR updating customer ' + JSON.stringify(error));
      }
    );
    this.modalRef.close();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      data => this.companies = data,
      error => console.log(error)
    );
  }
}
