import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {CustomerService} from "../shared/customer/customer.service";
import {Customer} from "../shared/customer/customer.model";
import {CompanyService} from "../shared/company/company.service";
import {UserService} from "../shared/user/user.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers = [];
  companies = [];

  isLoading = true;

  customer = {};

  isEditing = false;

  addCustomerForm: FormGroup;

  name = new FormControl('', Validators.minLength(2));
  email = new FormControl('', Validators.minLength(6));
  directPhone = new FormControl('');
  mobilePhone = new FormControl('', Validators.minLength(8));
  source = new FormControl('');
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


    this.addCustomerForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      directPhone: this.directPhone,
      mobilePhone: this.mobilePhone,
      source: this.source,
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
    this.customerService.getCustomers().subscribe(
      data => this.customers = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      data => {
        this.companies = data;
        this.companies.unshift({'id': '', 'name': 'company'});
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
      res => {
        const newcustomer = res.json();
        this.customers.push(newcustomer);
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
    this.customer = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the customers to reset the editing
    this.getCustomers();
  }

  // editCustomer(customerCompanyHandler) {
  //   this.customerService.editCustomer(customerCompanyHandler.cust).subscribe(
  //     res => {
  //       this.isEditing = false;
  //       this.customer = customerCompanyHandler;
  //       const companyIndex = this.companies.map(elem => {
  //         return elem.id;
  //       }).indexOf(customerCompanyHandler.cust.companyId)
  //       const companyName = this.companies[companyIndex].name;
  //       customerCompanyHandler.company.name = companyName;
  //       this.toast.setMessage('item edited successfully.', 'success');
  //     },
  //     error => this.toast.setMessage('Error editing customer: ' + JSON.stringify(error).substr(0, 200), 'danger')
  //   );
  // }

  deleteCustomer(customer) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.customerService.deleteCustomer(customer.customer).subscribe(
        res => {
          const pos = this.customers.map(elem => {
            return elem._id;
          }).indexOf(customer.customer._id);
          this.customers.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => this.toast.setMessage('Error deleting customer: ' + JSON.stringify(error).substr(0, 200), 'danger')
      );
    }
  }

}
