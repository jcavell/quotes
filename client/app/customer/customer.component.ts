import {Component, Input, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {CustomerService} from "../shared/customer/customer.service";
import {CompanyService} from "../shared/company/company.service";
import {UserService} from "../shared/user/user.service";
import {CustomerRecord} from "../shared/customer/customerRecord.model";
import {Company} from "../shared/company/company.model";
import {Subject} from "rxjs";
import {IAlert} from "../shared/customer/customer.alert";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: CustomerRecord[];
  companies: Company[];
  private _page: number;
  count: number;
  customer: CustomerRecord;
  private orderParams;
  alert: IAlert;

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


  @Input() set page(pageNum: number) {
    if (!isNaN(pageNum)) {
      this._page = pageNum;
      this.getCustomers(pageNum);
    }
  }

  get page(): number {
    return this._page;
  }

  ngOnInit() {

    this.customers = [];
    this.orderParams = {};

    this.search();

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

  private search() {
    return this.customerService.search(this.searchTerm$, this.orderParams)
      .subscribe(customerRecords => {
        this.customers = customerRecords[0];
        this.count = customerRecords[1];
       this._page = customerRecords[1] ? 1 : undefined;
      });
  }

  getCustomers(pageNum: number) {
    this.customerService.getCustomerRecords(this.orderParams, pageNum).subscribe(
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
    this.getCustomers(this._page);
  }

  newCustomerRecord() {
    return new CustomerRecord();
  }

  customerCreated(cr: CustomerRecord) {
    this.customers.push(cr);
  }

  alertCreated(alert: IAlert) {
    this.alert = alert;
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

  public closeAlert() {
    this.alert = undefined;
  }
}
