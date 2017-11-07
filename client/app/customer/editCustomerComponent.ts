import {Component, EventEmitter, Input, Output} from "@angular/core";

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
import {IAlert} from "../shared/customer/customer.alert";
import {Subject} from "rxjs";
import {Enquiry} from "../shared/quote/quote.model";


@Component({
  selector: 'edit-customer',
  templateUrl: './editCustomerComponent.html'
})
export class EditCustomerComponent {
  private modalRef: NgbModalRef;

  @Input() customerRecord: CustomerRecord;
  @Input() enquiry: Enquiry;
  @Input() activeTabId = 'company-tab';

  @Output() onCustomerCreated = new EventEmitter<CustomerRecord>();
  @Output() onCustomerUpdated = new EventEmitter<CustomerRecord>();
  @Output() onAlertCreated = new EventEmitter<IAlert>();

  customer: Customer;
  company: Company;
  invoiceAddress: Address;
  deliveryAddress: Address;

  // Company search variables
  companySearchTerm$ = new Subject<string>();
  private companyOrderParams = {};
  private _companyPage: number;
  companyCount: number;
  companies: Company[];

  // Customer search variables
  customerSearchTerm$ = new Subject<string>();
  private customerOrderParams = {};
  private _customerPage: number;
  customerCount: number;
  customers: CustomerRecord[];

  constructor(private modalService: NgbModal,
              public companyService: CompanyService,
              public customerService: CustomerService,
              public addressService: AddressService) {
  }

  onOpen() {
    this.searchCustomers();
    this.searchCompanies();

    this.customer = _.clone(this.customerRecord.customer);
    this.company =  _.clone(this.customerRecord.company);

    this.invoiceAddress = isNullOrUndefined(this.customerRecord.invoiceAddress) ? new Address() : _.clone(this.customerRecord.invoiceAddress);
    this.deliveryAddress = isNullOrUndefined(this.customerRecord.deliveryAddress) ? new Address() : _.clone(this.customerRecord.deliveryAddress);
  }

  private searchCompanies() {
    return this.companyService.search(this.companySearchTerm$, this.companyOrderParams)
      .subscribe(companies => {
        this.companies = companies[0];
        this.companyCount = companies[0].length ? companies[1] : 0;
        this._companyPage = companies[1] ? 1 : undefined;
      });
  }

  selectCompany(company: Company) {
    this.company = company;
    this.companyCount = undefined;
    this.companies = undefined;
  }

  selectCustomerRecord(customerRecord: CustomerRecord) {
    this.customer = customerRecord.customer;
    this.company = customerRecord.company;
    // TODO ensure no nulls are set
    this.invoiceAddress = customerRecord.invoiceAddress;
    this.deliveryAddress = customerRecord.deliveryAddress;
    this.customerCount = undefined;
    this.customers = undefined;
  }


  createNewCompany() {
    this.company = new Company();
  }

  createNewCustomer() {
    this.customer = new Customer();
  }


  private searchCustomers() {
    return this.customerService.search(this.customerSearchTerm$, this.customerOrderParams)
      .subscribe(customers => {
        this.customers = customers[0];
        this.customerCount = customers[0].length ? customers[1] : 0;
        this._customerPage = customers[1] ? 1 : undefined;
      });
  }


  open(content) {
    this.modalRef = this.modalService.open(content, {size: 'lg', beforeDismiss: this.reset});
    this.onOpen();
  }

  reset() {
    this.customer = new Customer();
    this.company = new Company();
    this.deliveryAddress = new Address();
    this.invoiceAddress = new Address();
return true;
  }

  isValid() {
    return this.customer.isValid();
    //  &&
    //   this.company.isValid() &&
    //   (this.invoiceAddress.isNew() || this.invoiceAddress.isValid() &&
    //   (this.deliveryAddress.isNew() || this.deliveryAddress.isValid()));
  }

  customerUnchanged() {
    return this.customer.id && _.isEqual(JSON.stringify(this.customerRecord.customer), JSON.stringify(this.customer));
  }
  companyUnchanged() {
    return this.company.id && _.isEqual(JSON.stringify(this.customerRecord.company), JSON.stringify(this.company));
  }
  invoiceAddressUnchanged() {
    return _.isEqual(JSON.stringify(this.customerRecord.invoiceAddress), JSON.stringify(this.invoiceAddress));
  }
  deliveryAddressUnchanged() {
    return _.isEqual(JSON.stringify(this.customerRecord.deliveryAddress), JSON.stringify(this.deliveryAddress));
  }
  customerEmpty() {
    return this.customer.id === undefined && this.customer.name === undefined && this.customer.email === undefined;
  }
  addressEmpty(address: Address) {
    return address.id === undefined && address.name === undefined && address.line1 === undefined;
  }

  upsertInvoiceAddress(): Observable<Address>  {
    return this.addressEmpty(this.invoiceAddress) || this.invoiceAddressUnchanged() ?
      Observable.of(this.invoiceAddress) :
      this.addressService.upsertAddress(this.invoiceAddress);
  }

  upsertDeliveryAddress(): Observable<Address> {
    return this.addressEmpty(this.deliveryAddress) || this.deliveryAddressUnchanged() ?
      Observable.of(this.deliveryAddress) :
      this.addressService.upsertAddress(this.deliveryAddress);
  }

  upsertCompany(): Observable<Company> {
    return this.companyUnchanged() ?
      Observable.of(this.company) :
      this.companyService.upsertCompany(this.company);
  }

  upsertCustomer(): Observable<Customer> {
    return this.customerEmpty() || this.customerUnchanged() ?
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
        this.onAlertCreated.emit({
          type: 'success',
          message: 'Customer ' + customer.name + ' updated'
        });

        if (!_.isEqual(this.customer, this.customerRecord.customer)) { // customer has changed
          this.customerRecord.customer = _.clone(customer);
          if (this.customerRecord.customer.id === undefined) { // new
            this.onCustomerCreated.emit(this.customerRecord);
          } else { // update
            this.onCustomerUpdated.emit(this.customerRecord);
          }
        }
      },
      error => {
        this.onAlertCreated.emit({
          type: 'danger',
          message: 'ERROR: ' + JSON.stringify(error)
        });
      }
    );
    this.modalRef.close();
  }
}
