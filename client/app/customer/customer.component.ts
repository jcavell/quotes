import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {CustomerService} from "../shared/customer/customer.service";
import {Customer} from "../shared/customer/customer.model";
import {CompanyService} from "../shared/company/company.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers = [];
  companies = [];
  isLoading = true;

  customerCompany = {};
  isEditing = false;

  addCustomerForm: FormGroup;

  firstName = new FormControl('', Validators.minLength(3));
  lastName = new FormControl('', Validators.minLength(3));
  salutation = new FormControl('');
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
  handlerId = new FormControl('', Validators.pattern('\\d+'));
  companyId = new FormControl('', Validators.pattern('\\d+'));

  constructor(private http: Http,
              private customerService: CustomerService,
              private companyService: CompanyService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getCustomers();
    this.getCompanies();


    this.addCustomerForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      salutation: this.salutation,
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
      handlerId: this.handlerId,
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
      this.addCustomerForm.value.firstName,
      this.addCustomerForm.value.lastName,
      this.addCustomerForm.value.salutation,
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
      parseInt(this.addCustomerForm.value.handlerId, 10),
      parseInt(this.addCustomerForm.value.companyId, 10)
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

  enableEditing(customerCompany) {
    this.isEditing = true;
    this.customerCompany = customerCompany;
  }

  cancelEditing() {
    this.isEditing = false;
    this.customerCompany = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the customers to reset the editing
    this.getCustomers();
  }

  editCustomer(customerCompany) {
    this.customerService.editCustomer(customerCompany._1).subscribe(
      res => {
        this.isEditing = false;
        this.customerCompany = customerCompany;
        const companyIndex = this.companies.map(elem => {
          return elem.id;
        }).indexOf(customerCompany._1.companyId)
        const companyName = this.companies[companyIndex].name;
        customerCompany._2.name = companyName;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => this.toast.setMessage('Error editing customer: ' + JSON.stringify(error).substr(0, 200), 'danger')
    );
  }

  deleteCustomer(customerCompany) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.customerService.deleteCustomer(customerCompany._1).subscribe(
        res => {
          const pos = this.customers.map(elem => {
            return elem._id;
          }).indexOf(customerCompany._1._id);
          this.customers.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => this.toast.setMessage('Error deleting customer: ' + JSON.stringify(error).substr(0, 200), 'danger')
      );
    }
  }

}
