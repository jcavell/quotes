import {Component, Input, OnInit} from "@angular/core";

import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Company} from "../shared/company/company.model";
import {CompanyService} from "../shared/company/company.service";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {Customer} from "../shared/customer/customer.model";


const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'edit-customer',
  templateUrl: './editCustomerComponent.html'
})
export class EditCustomerComponent implements OnInit{
  closeResult: string;
  @Input() customer: Customer;
  @Input() company: Company;

  customerEdited: Customer;
  companyEdited: Company;

  companies: Company[];

  constructor(private modalService: NgbModal, public companyService: CompanyService) {
  }

  ngOnInit() {
    this.getCompanies();
    this.customerEdited = new Customer(
      this.customer.id,
      this.customer.name,
      this.customer.email,
      this.customer.directPhone,
      this.customer.mobilePhone,
      this.customer.source,
      this.customer.position,
      this.customer.isMainContact,
      this.customer.twitter,
      this.customer.facebook,
      this.customer.linkedIn,
      this.customer.skype,
      this.customer.companyId);

    this.companyEdited = new Company(
      this.company.id,
      this.company.name
    );
  }



  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
 //       : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
          : this.companies.filter(c => c.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  resultFormatter = (c: Company) => c.name;

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateCompany(company: Company) {
    console.log('Updating company: ' + JSON.stringify(company));
    this.companyService.editCompany(company).subscribe(
      res => {
        // this.dismiss();
      },
      error => console.log('ERROR')
    );
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      data => this.companies = data,
      error => console.log(error)
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
