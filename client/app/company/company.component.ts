import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {CompanyService} from "../shared/company/company.service";
import {Company} from "../shared/company/company.model";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  companies = [];
  isLoading = true;

  company = {};
  isEditing = false;

  addCompanyForm: FormGroup;
  name = new FormControl('');

  constructor(private http: Http,
              private companyService: CompanyService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCompanies();

    this.addCompanyForm = this.formBuilder.group({
      name: this.name
    });
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      data => this.companies = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCompany() {
    const company = new Company(0, this.addCompanyForm.value.name);
    this.companyService.addCompany(company).subscribe(
      res => {
        const newcompany = res.json();
        this.companies.push(newcompany);
        this.addCompanyForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error =>  this.toast.setMessage('Error inserting company: ' + JSON.stringify(error).substr(0, 200), 'danger')
    );
  }

  enableEditing(company) {
    this.isEditing = true;
    this.company = company;
  }

  cancelEditing() {
    this.isEditing = false;
    this.company = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the companies to reset the editing
    this.getCompanies();
  }

  editCompany(company) {
    this.companyService.editCompany(company).subscribe(
      res => {
        this.isEditing = false;
        this.company = company;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error =>  this.toast.setMessage('Error updating company: ' + JSON.stringify(error).substr(0, 200), 'danger')
    );
  }

  deleteCompany(company) {
    if (window.confirm('Are you sure you want to permanently delete this company?')) {
      this.companyService.deleteCompany(company).subscribe(
        res => {
          const pos = this.companies.map(elem => { return elem._id; }).indexOf(company._id);
          this.companies.splice(pos, 1);
          this.toast.setMessage('company deleted successfully.', 'success');
        },
        error =>  this.toast.setMessage('Error deleting company: ' + JSON.stringify(error).substr(0, 200), 'danger')
      );
    }
  }

}
