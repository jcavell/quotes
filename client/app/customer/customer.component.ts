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
import {Router} from "@angular/router";
import {Refresher} from "./refresher";

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
  private searchParams;
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
              private _router: Router,
              private customerService: CustomerService,
              private companyService: CompanyService,
              private userService: UserService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) {
  }


  @Input() set page(pageNum: number) {
    if (!isNaN(pageNum)) {
      this._page = pageNum;
      this.getCustomers();
    }
  }

  get page(): number {
    return this._page;
  }

  ngOnInit() {

    new Refresher(this._router);

    this.customers = [];
    this.searchParams = {};

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
    return this.customerService.search(this.searchTerm$, this.searchParams)
      .subscribe(customerRecords => {
        this.customers = customerRecords[0];
        this.count = customerRecords[0].length ? customerRecords[1] : 0;
       this._page = customerRecords[1] ? 1 : undefined;
      });
  }

  getCustomers() {
    this.customerService.getCustomerRecords(this.searchParams, this._page).subscribe(
      data => this.customers = data,
      error => console.log(error)
    );
  }

  getClass(field: string): string {
    let clazz: string;
    if (this.searchParams['orderField'] === field) {
      if (this.searchParams['orderAsc']) {
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
    if (this.searchParams['orderField'] === field && this.searchParams['orderAsc']) {
      this.searchParams['orderAsc'] = false;
    } else {
      this.searchParams['orderAsc'] = true;
    }
    this.searchParams['orderField'] = field;
    this._page = 1;
    this.getCustomers();
  }

  newCustomerRecord() {
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

  alertCreated(alert: IAlert) {
    this.alert = alert;
  }

  public closeAlert() {
    this.alert = undefined;
  }
}
