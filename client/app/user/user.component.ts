import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {UserService} from "../shared/user/user.service";
import {User} from "../shared/user/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users = [];
  isLoading = true;

  user = {};
  isEditing = false;

  addUserForm: FormGroup;
  name = new FormControl('');
  email = new FormControl('');
  directPhone = new FormControl('');
  mobilePhone = new FormControl('');

  constructor(private http: Http,
              private userservice: UserService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUsers();

    this.addUserForm = this.formBuilder.group({
      email: this.email,
      name: this.name,
      directPhone: this.directPhone,
      mobilePhone: this.mobilePhone
    });
  }

  getUsers() {
    this.userservice.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addUser() {
    const userToAdd = new User(0, this.addUserForm.value.name, this.addUserForm.value.email, this.addUserForm.value.directPhone, this.addUserForm.value.mobilePhone);
    this.userservice.addUser(userToAdd).subscribe(
      res => {
        this.user = res.json();
        this.users.push(this.user);
        this.addUserForm.reset();
        this.toast.setMessage('user added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(user) {
    this.isEditing = true;
    this.user = user;
  }

  cancelEditing() {
    this.isEditing = false;
    this.user = {};
    this.toast.setMessage('user editing cancelled.', 'warning');
    // reload the users to reset the editing
    this.getUsers();
  }

  editUser(user) {
    this.userservice.editUser(user).subscribe(
      res => {
        this.isEditing = false;
        this.user = user;
        this.toast.setMessage('user edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteUser(user) {
    if (window.confirm('Are you sure you want to permanently delete this user?')) {
      this.userservice.deleteUser(user).subscribe(
        res => {
          const pos = this.users.map(elem => { return elem._id; }).indexOf(user._id);
          this.users.splice(pos, 1);
          this.toast.setMessage('user deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
