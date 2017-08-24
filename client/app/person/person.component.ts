import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {PersonService} from "../shared/person/person.service";
import {Person} from "../shared/person/person.model";
import {CompanyService} from "../shared/company/company.service";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  people = [];
  companies = [];
  isLoading = true;

  personCompany = {};
  isEditing = false;

  addPersonForm: FormGroup;
  name = new FormControl('', Validators.minLength(3));
  email = new FormControl('', Validators.minLength(6));
  tel = new FormControl('', Validators.minLength(8));
  companyId = new FormControl('', Validators.pattern('\\d+'));

  constructor(private http: Http,
              private personService: PersonService,
              private companyService: CompanyService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPeople();
    this.getCompanies();


    this.addPersonForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      tel: this.tel,
      companyId: this.companyId
    });
  }

  getPeople() {
    this.personService.getPeople().subscribe(
      data => this.people = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      data => {this.companies = data; this.companies.unshift({'id' : '', 'name' : 'company'});},
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addPerson() {
    const person = new Person(
      0,
      this.addPersonForm.value.name,
      this.addPersonForm.value.email,
      this.addPersonForm.value.tel,
      parseInt(this.addPersonForm.value.companyId, 10)
    );
    this.personService.addPerson(person).subscribe(
      res => {
        const newperson = res.json();
        this.people.push(newperson);
        this.addPersonForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error =>  this.toast.setMessage('Error inserting person: ' + JSON.stringify(error).substr(0, 200), 'danger')
    );
  }

  enableEditing(personCompany) {
    this.isEditing = true;
    this.personCompany = personCompany;
  }

  cancelEditing() {
    this.isEditing = false;
    this.personCompany = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the people to reset the editing
    this.getPeople();
  }

  editPerson(personCompany) {
    this.personService.editPerson(personCompany._1).subscribe(
      res => {
        this.isEditing = false;
        this.personCompany = personCompany;
        const companyIndex = this.companies.map(elem => { return elem.id; }).indexOf(personCompany._1.companyId)
        const companyName = this.companies[companyIndex].name;
        personCompany._2.name = companyName;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error =>  this.toast.setMessage('Error editing person: ' + JSON.stringify(error).substr(0, 200), 'danger')
    );
  }

  deletePerson(personCompany) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.personService.deletePerson(personCompany._1).subscribe(
        res => {
          const pos = this.people.map(elem => { return elem._id; }).indexOf(personCompany._1._id);
          this.people.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error =>  this.toast.setMessage('Error deleting person: ' + JSON.stringify(error).substr(0, 200), 'danger')
      );
    }
  }

}
