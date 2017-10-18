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


@Component({
  selector: 'edit-customer',
  templateUrl: './editCustomerComponent.html'
})
export class EditCustomerComponent implements OnInit {
  private modalRef: NgbModalRef;
  @Input() customer: Customer;
  @Input() company: Company;
  @Input() invoiceAddress: Address;
  @Input() deliveryAddress: Address;

  customerEdited: Customer;
  companyEdited: Company;
  invoiceAddressEdited: Address;
  deliveryAddressEdited: Address;

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
    this.companyEdited = _.clone(this.company);
    this.customerEdited = _.clone(this.customer);
    this.invoiceAddressEdited = _.clone(this.invoiceAddress);
    this.deliveryAddressEdited = _.clone(this.deliveryAddress);
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


  updateAddress(address: Address) {
      this.addressService.updateAddress(address).subscribe(
        res => {
          // don't do anything much
        },
        error => console.log('ERROR')
      );
  }
  updateAddresses() {
    if (!_.isEqual(this.invoiceAddress, this.invoiceAddressEdited)) {
      this.updateAddress(this.invoiceAddressEdited);
      this.customerEdited.invoiceAddressId = this.invoiceAddressEdited.id;
    }
    if (!_.isEqual(this.deliveryAddress, this.deliveryAddressEdited)) {
      this.updateAddress(this.deliveryAddressEdited);
      this.customerEdited.deliveryAddressId = this.deliveryAddressEdited.id;
    }
  }
  updateCustomer() {
    if (!_.isEqual(this.customer, this.customerEdited)) {
      this.customerService.editCustomer(this.customerEdited).subscribe(
        res => {
          this.company.name = this.companyEdited.name;
          this.customer.id = this.customerEdited.id;
          this.customer.name = this.customerEdited.name;
          this.customer.email = this.customerEdited.email;
          this.customer.directPhone = this.customerEdited.directPhone;
          this.customer.mobilePhone = this.customerEdited.mobilePhone;
          this.customer.source = this.customerEdited.source;
          this.customer.position = this.customerEdited.position;
          this.customer.isMainContact = this.customerEdited.isMainContact;
          this.customer.twitter = this.customerEdited.twitter;
          this.customer.facebook = this.customerEdited.facebook;
          this.customer.linkedIn = this.customerEdited.linkedIn;
          this.customer.skype = this.customerEdited.skype;
          this.customer.companyId = this.customerEdited.companyId;
          this.customer.active = this.customerEdited.active;
        },
        error => console.log('ERROR')
      );
    }
  }


  updateCompany() {
    if (!_.isEqual(this.company, this.companyEdited)) {
      this.companyService.editCompany(this.companyEdited).subscribe(
        res => {
          this.customerEdited.companyId = this.companyEdited.id;
        },
        error => console.log('ERROR')
      );
    }
  }

  updateAll() {
    // TODO - do sequentially
    this.updateCompany();
    this.updateAddresses();
    this.updateCustomer();

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
