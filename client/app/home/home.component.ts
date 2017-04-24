import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  reps = [];
  isLoading = true;

  rep = {};
  isEditing = false;

  addRepForm: FormGroup;
  name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getReps();

    this.addRepForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
    });
  }

  getReps() {
    this.dataService.getReps().subscribe(
      data => this.reps = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addRep() {
    this.dataService.addRep(this.addRepForm.value).subscribe(
      res => {
        const newRep = res.json();
        this.reps.push(newRep);
        this.addRepForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(rep) {
    this.isEditing = true;
    this.rep = rep;
  }

  cancelEditing() {
    this.isEditing = false;
    this.rep = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the reps to reset the editing
    this.getReps();
  }

  editRep(rep) {
    this.dataService.editRep(rep).subscribe(
      res => {
        this.isEditing = false;
        this.rep = rep;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteRep(rep) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteRep(rep).subscribe(
        res => {
          const pos = this.reps.map(elem => { return elem._id; }).indexOf(rep._id);
          this.reps.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
