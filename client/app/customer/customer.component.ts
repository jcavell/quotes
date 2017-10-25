import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {CustomerService} from "../shared/customer/customer.service";
import {CompanyService} from "../shared/company/company.service";
import {UserService} from "../shared/user/user.service";
import {CustomerRecord, IAlert} from "../shared/customer/customerRecord.model";
import {Company} from "../shared/company/company.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: CustomerRecord[];
  companies: Company[];
  page = 1;
  count: number;
  customer: CustomerRecord;
  private orderParams;

  addCustomerForm: FormGroup;
  name = new FormControl('', Validators.minLength(2));
  email = new FormControl('', Validators.minLength(6));
  directPhone = new FormControl('');
  mobilePhone = new FormControl('', Validators.minLength(8));
  position = new FormControl('');
  isMainContact = new FormControl('');
  twitter = new FormControl('');
  facebook = new FormControl('');
  linkedIn = new FormControl('');
  skype = new FormControl('');
  companyId = new FormControl('', Validators.pattern('\\d+'));

  searchTerm$ = new Subject<string>();

  constructor(private http: Http,
              private customerService: CustomerService,
              private companyService: CompanyService,
              private userService: UserService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.customers = [];
    this.orderParams = {};

    this.customerService.search(this.searchTerm$, this.orderParams)
      .subscribe(customerRecords => {
        this.customers = customerRecords[0];
        this.count = customerRecords[1];
      });

    this.addCustomerForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      directPhone: this.directPhone,
      mobilePhone: this.mobilePhone,
      position: this.position,
      isMainContact: this.isMainContact,
      twitter: this.twitter,
      facebook: this.facebook,
      linkedIn: this.linkedIn,
      skype: this.skype,
      companyId: this.companyId
    });
  }

  getCustomers() {
    this.customerService.getCustomerRecords(this.orderParams).subscribe(
      data => this.customers = data,
      error => console.log(error)
    );
  }

  getClass(field: string): string {
    let clazz: string;
    if (this.orderParams['orderField'] === field) {
      if (this.orderParams['orderAsc']) {
        clazz = 'fa fa-sort-desc';
      } else {
        clazz = 'fa fa-sort-asc';
      }
    } else {
      clazz = 'fa fa-sort';
    }
    return clazz;
  }

  orderBy(field: string) {
    if (this.orderParams['orderField'] === field && this.orderParams['orderAsc']) {
      this.orderParams['orderAsc'] = false;
    } else {
      this.orderParams['orderAsc'] = true;
    }
    this.orderParams['orderField'] = field;
    this.getCustomers();
  }

  newCustomerRecord(){
    return new CustomerRecord();
  }

  customerCreated(cr: CustomerRecord) {
    this.customers.push(cr);
  }

  deleteCustomer(customer) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.customerService.deleteCustomer(customer.customer).subscribe(
        res => {
          const pos = this.customers.map(elem => {
            return elem.customer.id;
          }).indexOf(customer.customer._id);
          this.customers.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => this.toast.setMessage('Error deleting customer: ' + JSON.stringify(error).substr(0, 200), 'danger')
      );
    }
  }

  public closeAlert(cust: CustomerRecord, alert: IAlert) {
    const index: number = cust.alerts.indexOf(alert);
    cust.alerts.splice(index, 1);
  }
}
