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
    this.companyEdited = _.clone(this.customerRecord.company);
    this.customerEdited = _.clone(this.customerRecord.customer);
    this.invoiceAddressEdited = _.clone(this.customerRecord.invoiceAddress);
    this.deliveryAddressEdited = _.clone(this.customerRecord.deliveryAddress);
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
    if (!_.isEqual(this.customerRecord.invoiceAddress, this.invoiceAddressEdited)) {
      this.updateAddress(this.invoiceAddressEdited);
      this.customerEdited.invoiceAddressId = this.invoiceAddressEdited.id;
    }
    if (!_.isEqual(this.customerRecord.deliveryAddress, this.deliveryAddressEdited)) {
      this.updateAddress(this.deliveryAddressEdited);
      this.customerEdited.deliveryAddressId = this.deliveryAddressEdited.id;
    }
  }
  updateCustomer() {
    if (!_.isEqual(this.customerRecord.customer, this.customerEdited)) {
      this.customerService.editCustomer(this.customerEdited).subscribe(
        res => {
          this.customerRecord.company = this.companyEdited;
          this.customerRecord.customer = this.customerEdited;
        },
        error => console.log('ERROR')
      );
    }
  }


  updateCompany() {
    if (!_.isEqual(this.customerRecord.company, this.companyEdited)) {
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
