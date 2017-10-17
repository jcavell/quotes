import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastComponent} from "../shared/toast/toast.component";
import {XsellService} from "../shared/xsell/xsell.service";
import {Xsell} from "../shared/xsell/xsell.model";

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
              private xsellservice: XsellService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getXsells();

    this.addXsellForm = this.formBuilder.group({
      productId: this.productId
    });
  }

  getXsells() {
    this.xsellservice.getXsells().subscribe(
      data => this.xsells = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addXsell() {
    const xsell = new Xsell(0, parseInt(this.addXsellForm.value.sku, 10));
    this.xsellservice.addXsell(xsell).subscribe(
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
    xsell.sku = parseInt(xsell.sku, 10);
    this.xsellservice.editXsell(xsell).subscribe(
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
      this.xsellservice.deleteXsell(xsell).subscribe(
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
