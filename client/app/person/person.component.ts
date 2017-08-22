import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {PersonService} from "../shared/person/person.service";
import {Person} from "../shared/person/person.model";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  people = [];
  isLoading = true;

  person = {};
  isEditing = false;

  addPersonForm: FormGroup;
  name = new FormControl('');

  constructor(private http: Http,
              private personService: PersonService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPeople();

    this.addPersonForm = this.formBuilder.group({
      name: this.name
    });
  }

  getPeople() {
    this.personService.getPeople().subscribe(
      data => this.people = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addPerson() {
    const person = new Person(0, this.addPersonForm.value.name);
    this.personService.addPerson(person).subscribe(
      res => {
        const newperson = res.json();
        this.people.push(newperson);
        this.addPersonForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(person) {
    this.isEditing = true;
    this.person = person;
  }

  cancelEditing() {
    this.isEditing = false;
    this.person = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the people to reset the editing
    this.getPeople();
  }

  editPerson(person) {
    this.personService.editPerson(person).subscribe(
      res => {
        this.isEditing = false;
        this.person = person;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deletePerson(person) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.personService.deletePerson(person).subscribe(
        res => {
          const pos = this.people.map(elem => { return elem._id; }).indexOf(person._id);
          this.people.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
