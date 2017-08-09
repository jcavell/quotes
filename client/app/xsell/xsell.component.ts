import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {DataService} from "../services/data.service";
import {ToastComponent} from "../shared/toast/toast.component";

@Component({
  selector: 'app-xsell',
  templateUrl: './xsell.component.html',
  styleUrls: ['./xsell.component.scss']
})
export class XsellComponent implements OnInit {

  xsells = [];
  isLoading = true;

  xsell = {};
  isEditing = false;

  addXsellForm: FormGroup;
  productId = new FormControl('', Validators.pattern('\\d+'));

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getXsells();

    this.addXsellForm = this.formBuilder.group({
      productId: this.productId
    });
  }

  getXsells() {
    this.dataService.getXsells().subscribe(
      data => this.xsells = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addXsell() {
    this.dataService.addXsell(this.addXsellForm.value).subscribe(
      res => {
        const newXsell = res.json();
        this.xsells.push(newXsell);
        this.addXsellForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(xsell) {
    this.isEditing = true;
    this.xsell = xsell;
  }

  cancelEditing() {
    this.isEditing = false;
    this.xsell = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the xsells to reset the editing
    this.getXsells();
  }

  editXsell(xsell) {
    this.dataService.editXsell(xsell).subscribe(
      res => {
        this.isEditing = false;
        this.xsell = xsell;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteXsell(xsell) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteXsell(xsell).subscribe(
        res => {
          const pos = this.xsells.map(elem => { return elem._id; }).indexOf(xsell._id);
          this.xsells.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
