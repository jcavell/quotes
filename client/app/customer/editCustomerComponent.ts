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

  companies: Company[];

  constructor(private modalService: NgbModal,
              public companyService: CompanyService,
              public customerService: CustomerService,
              public addressService: AddressService
  ) {
  }

  ngOnInit() {
    this.getCompanies();
    this.company = _.clone(this.customerRecord.company);
    this.customer = _.clone(this.customerRecord.customer);
    this.invoiceAddress = _.clone(this.customerRecord.invoiceAddress);
    this.deliveryAddress = _.clone(this.customerRecord.deliveryAddress);
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


  updateInvoiceAddress(): Observable<Address>  {
    const addressObserver = Observable.of(this.invoiceAddress);
    if (!_.isEqual(this.customerRecord.invoiceAddress, this.invoiceAddress)) {
      this.addressService.updateAddress(this.invoiceAddress).subscribe(
        res => {
          //
        },
        error => Observable.throw(new Error('Could not update invoice address: ' + JSON.stringify(error)))
      );
    }
    return addressObserver;
  }

  updateDeliveryAddress(): Observable<Address>  {
    const addressObserver = Observable.of(this.deliveryAddress);
    if (!_.isEqual(this.customerRecord.deliveryAddress, this.deliveryAddress)) {
      this.addressService.updateAddress(this.deliveryAddress).subscribe(
        res => {
          this.customer.deliveryAddressId = this.deliveryAddress.id;
        },
        error => Observable.throw(new Error('Could not update delivery address: ' + JSON.stringify(error)))
      );
    }
    return addressObserver;
  }

  updateCustomer(): Observable<Customer> {
    const customerObserver = Observable.of(this.customer);
    if (
      !_.isEqual(this.customerRecord.customer, this.customer) ||
      !_.isEqual(this.customerRecord.invoiceAddress, this.invoiceAddress) ||
      !_.isEqual(this.customerRecord.deliveryAddress, this.deliveryAddress) ||
      !_.isEqual(this.customerRecord.company, this.company)
    ) {
      console.log('Updating customer to: ' + JSON.stringify(this.customer));
      this.customerService.editCustomer(this.customer).subscribe(
        res => {
          this.customerRecord.customer = _.clone(this.customer);
        },
        error => Observable.throw(new Error('Could not update customer: ' + JSON.stringify(error)))
      );
    }
    return customerObserver;
  }


  updateCompany(): Observable<Company> {
    const companyObserver = Observable.of(this.company);
    if (!_.isEqual(this.customerRecord.company, this.company)) {
      console.log('Updating company to: ' + JSON.stringify(this.company));
      this.companyService.editCompany(this.company).subscribe(
        res => {
        },
        error => Observable.throw(new Error('Could not update company: ' + JSON.stringify(error)))
      );
    }
    return companyObserver;
  }

  updateAll() {
    // TODO should these be nested?
    this.updateCompany().subscribe(
      res => {
        this.customer.companyId = this.company.id;
        this.customerRecord.company = this.company;
      },
      error => console.log((JSON.stringify(error)))
    );

    this.updateInvoiceAddress().subscribe(
      res => {
        this.customer.invoiceAddressId = this.invoiceAddress.id;
      },
      error => console.log((JSON.stringify(error)))
    );

    this.updateDeliveryAddress().subscribe(
      res => {
        this.customer.deliveryAddressId = this.deliveryAddress.id;
      },
      error => console.log((JSON.stringify(error)))
    );

    this.updateCustomer().subscribe(
      res => {
        console.log('Customer updated');
      },
      error => console.log((JSON.stringify(error)))
    );


    this.updateMessage = 'Customer updated';
    this.modalRef.close();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      data => this.companies = data,
      error => console.log(error)
    );
  }
}
