import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {CustomerService} from "../shared/customer/customer.service";
import {Customer} from "../shared/customer/customer.model";
import {CompanyService} from "../shared/company/company.service";
import {UserService} from "../shared/user/user.service";
import {CustomerRecord, IAlert} from "../shared/customer/customerRecord.model";
import {Company} from "../shared/company/company.model";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: CustomerRecord[];
  companies: Company[];

  isLoading = true;

  customer: CustomerRecord;

  isEditing = false;

  addCustomerForm: FormGroup;

  name = new FormControl('', Validators.minLength(2));
  email = new FormControl('', Validators.minLength(6));
  directPhone = new FormControl('');
  mobilePhone = new FormControl('', Validators.minLength(8));
  private searchAndOrderParams;
  position = new FormControl('');
  isMainContact = new FormControl('');
  twitter = new FormControl('');
  facebook = new FormControl('');
  linkedIn = new FormControl('');
  skype = new FormControl('');
  companyId = new FormControl('', Validators.pattern('\\d+'));

  constructor(private http: Http,
              private customerService: CustomerService,
              private companyService: CompanyService,
              private userService: UserService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getCustomers();
    this.getCompanies();

    this.searchAndOrderParams = {};

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
    this.customerService.getCustomerRecords(this.searchAndOrderParams).subscribe(
      data => this.customers = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getClass(field: string): string {
    let clazz: string;
    if (this.searchAndOrderParams['orderField'] === field) {
      if (this.searchAndOrderParams['orderAsc']) {
        clazz = 'fa fa-sort-asc';
      } else {
        clazz = 'fa fa-sort-desc';
      }
    } else {
      clazz = 'fa fa-sort';
    }
    return clazz;
  }

  orderBy(field: string) {
    if (this.searchAndOrderParams['orderField'] === field && this.searchAndOrderParams['orderAsc']) {
      this.searchAndOrderParams['orderAsc'] = false;
    } else {
      this.searchAndOrderParams['orderAsc'] = true;
    }
    this.searchAndOrderParams['orderField'] = field;
    this.getCustomers();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      data => {
        this.companies = data;
        // this.companies.unshift({'id': '', 'name': 'company'});
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCustomer() {
    const customer = new Customer(
      0,
      this.addCustomerForm.value.name,
      this.addCustomerForm.value.email,
      this.addCustomerForm.value.directPhone,
      this.addCustomerForm.value.mobilePhone,
      this.addCustomerForm.value.source,
      this.addCustomerForm.value.position,
      this.addCustomerForm.value.isMainContact,
      this.addCustomerForm.value.twitter,
      this.addCustomerForm.value.facebook,
      this.addCustomerForm.value.linkedIn,
      this.addCustomerForm.value.skype,
      parseInt(this.addCustomerForm.value.companyId, 10),
      null, // repId
      null, // invoiceaddressId
      null, // deliveryAddressId
      true // active
    );
    this.customerService.addCustomer(customer).subscribe(
      newCustomer => {
        this.customers.push(newCustomer);
        this.addCustomerForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => this.toast.setMessage('Error inserting customer: ' + JSON.stringify(error).substr(0, 200), 'danger')
    );
  }

  enableEditing(customer) {
    this.isEditing = true;
    this.customer = customer;
  }

  cancelEditing() {
    this.isEditing = false;
    this.customer = undefined;
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the customers to reset the editing
    this.getCustomers();
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
