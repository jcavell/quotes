import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {QuoteItem} from "../shared/quote/quote.model";
import {GazPrice, GazProduct} from "../shared/gazproduct/gazproduct.model";
import {GazProductService} from "../shared/gazproduct/gazProduct.service";
import {Subject} from "rxjs";
import {IAlert} from "../shared/customer/customer.alert";
import _ from "lodash";
import {QuoteService} from "../shared/quote/quote.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicTextbox} from "../shared/dynamic/dynamicTextbox";
import {DynamicInputControlService} from "../shared/dynamic/dynamicInputControlService";
import {DynamicCheckbox} from "../shared/dynamic/dynamicCheckbox";
import {DynamicInput} from "../shared/dynamic/dynamicInput";


@Component({
  selector: 'edit-quote-item',
  templateUrl: './editQuoteItemComponent.html',
  styleUrls: ['./quotes-modal.scss'],
  providers: [ DynamicInputControlService ]
})
export class EditQuoteItemComponent implements OnInit {
  private modalRef: NgbModalRef;
  @Input() quoteItem: QuoteItem;
  quoteItemCopy: QuoteItem;
  @Input() quoteId: number;
  @Input() priceInputs: DynamicInput<any>[][] = [];

  productId$ = new Subject<string>();
  quoteItemForm: FormGroup;
  form: FormGroup; // todo this is temp, for priceInputs

  alert: IAlert;
  @Output() onQuoteItemUpdated = new EventEmitter<QuoteItem>();
  @Output() onQuoteItemCreated = new EventEmitter<QuoteItem>();
  @Output() onAlertCreated = new EventEmitter<IAlert>();

  constructor(private modalService: NgbModal, public gazProductService: GazProductService, public quoteService: QuoteService, private qcs: DynamicInputControlService) {
  }

  ngOnInit() {
   // this.form = this.qcs.toFormGroup(this.priceInputs);
  }

  changeProduct() {
    this.productId$.debounceTime(400)
      .distinctUntilChanged()
      .filter(pid => pid.length > 1)
      .switchMap(pid => {
        return this.gazProductService.getProduct(pid);
      }).subscribe(
      product => {
        this.quoteItemCopy.product = product;
        this.populatePricesForm();
        this.productName.setValue(product.productname); // todo remove
        this.productDescription.setValue(product.description1); // todo remove
      },
      error => {
        this.alert = {
          type: 'danger',
          message: 'ERROR: ' + JSON.stringify(error)
        };
      }
    );
  }


  open(content) {
    this.modalRef = this.modalService.open(content, {
      size: 'lg',
      windowClass: 'modal-xxl', // todo make this work
      beforeDismiss: this.reset
    });
    this.onOpen();
  }

  onOpen() {
    if (!this.quoteItem) {
      this.quoteItemCopy = new QuoteItem(this.quoteId);
    } else {
      this.quoteItemCopy = _.clone(this.quoteItem);
    }
    this.populatePricesForm();
    this.changeProduct();
    this.populateValidators();
  }

  reset() {
    return true;
  }

  alertCreated(alert: IAlert) {
    this.alert = alert;
  }

  public closeAlert() {
    this.alert = undefined;
  }

  getThumb(product: GazProduct) {
    return this.gazProductService.getThumb(product);
  }

  public upsertQuoteItem() {
    const quoteItem = new QuoteItem(
      this.quoteItemCopy.quoteId,
      this.quoteItemCopy.id,
      this.productIdInt,
      this.quoteItemCopy.product,
      this.quantityInt,
      this.colour.value,
      this.priceIncludes.value,
      this.printSetupFloat,
      this.printSetupMarkupFloat,
      this.carriageFloat,
      this.carriageMarkupFloat,
      this.vatFloat
    );

    const quoteIsNew = quoteItem.id === undefined;
    const quoteHasChanged = !_.isEqual(this.quoteItem, quoteItem);

    if (quoteHasChanged) {
      this.quoteService.upsertQuoteItem(quoteItem).subscribe(
        qi => {
          this.onAlertCreated.emit({
            type: 'success',
            message: ('Quote item for product id ' + qi.productId + ' ' + quoteIsNew ? 'created' : 'updated')
          });

          if (quoteIsNew) {
            this.onQuoteItemCreated.emit(qi);
          } else { // quote updated
            this.onQuoteItemUpdated.emit(qi);
          }
        },
        error => {
          this.onAlertCreated.emit({
            type: 'danger',
            message: 'ERROR: ' + JSON.stringify(error)
          });
        }
      );
    } else {
      this.onAlertCreated.emit({
        type: 'danger',
        message: 'ERROR: You did not change anything'
      });
    }
    this.modalRef.close();
  }


  populateValidators(): void {
    this.quoteItemForm = new FormGroup({
      'productId': new FormControl(this.quoteItemCopy.product.productid, [Validators.required, Validators.min(1), Validators.max(10000)]),
      'productName': new FormControl(this.quoteItemCopy.product.productname, [Validators.required]),
      'productDescription': new FormControl(this.quoteItemCopy.product.description1, [Validators.required]),
      'quantity': new FormControl(this.quoteItemCopy.quantity, [Validators.required, Validators.min(1), Validators.max(10000)]),
      'colour': new FormControl(this.quoteItemCopy.colour),
      'priceIncludes': new FormControl(this.quoteItemCopy.priceIncludes),
      'printSetup': new FormControl(this.quoteItemCopy.printSetup, [Validators.required, Validators.min(0.01), Validators.max(10000)]),
      'printSetupMarkup': new FormControl(this.quoteItemCopy.printSetupMarkup, [Validators.required, Validators.min(0.0), Validators.max(200)]),
      'carriage': new FormControl(this.quoteItemCopy.carriage, [Validators.required, Validators.min(0.01), Validators.max(10000)]),
      'carriageMarkup': new FormControl(this.quoteItemCopy.carriageMarkup, [Validators.required, Validators.min(0.0), Validators.max(200)]),
      'vat': new FormControl(this.quoteItemCopy.vat, [Validators.required, Validators.min(0), Validators.max(100)])
    });
  }

  get productId() { return this.quoteItemForm.get('productId'); }
  get productName() { return this.quoteItemForm.get('productName'); }
  get productDescription() { return this.quoteItemForm.get('productDescription'); }
  get quantity() { return this.quoteItemForm.get('quantity'); }
  get colour() { return this.quoteItemForm.get('colour'); }
  get priceIncludes() { return this.quoteItemForm.get('priceIncludes'); }
  get printSetup() { return this.quoteItemForm.get('printSetup'); }
  get printSetupMarkup() { return this.quoteItemForm.get('printSetupMarkup'); }
  get carriage() { return this.quoteItemForm.get('carriage'); }
  get carriageMarkup() { return this.quoteItemForm.get('carriageMarkup'); }
  get vat() { return this.quoteItemForm.get('vat'); }

  get productIdInt() { return parseInt(this.productId.value, 10); }
  get quantityInt() { return  parseInt(this.quantity.value, 10); }
  get printSetupFloat() { return  parseFloat(this.printSetup.value); }
  get printSetupMarkupFloat() { return  parseFloat(this.printSetupMarkup.value); }
  get carriageFloat() { return  parseFloat(this.carriage.value); }
  get carriageMarkupFloat() { return  parseFloat(this.carriageMarkup.value); }
  get vatFloat() { return parseFloat(this.vat.value); }

  get unitPrice() {
    return 2000000; // todo remove
  }
  get printSetupPrice() {
    return this.printSetupFloat * (1 + this.printSetupMarkupFloat / 100);
  }
  get carriagePrice() {
    return this.carriageFloat * (1 + this.carriageMarkupFloat / 100);
  }

  get totalPrice() { // todo do not use unit price here
    return (this.unitPrice * this.quantityInt) + this.printSetupPrice + this.carriagePrice * (1 + this.vatFloat / 100);
  }

  public togglePriceForQuantity(e, price: GazPrice) {
    if (e.target.checked) {
      // show price for quantity
      console.log("Adding price " + price.qty);
    } else {
      // remove price for quantity
      console.log("Removing price" + price.qty);
    }
  }

  private populatePricesForm() {
    this.priceInputs = this.getPriceInputs();
    this.form = this.qcs.toFormGroup(this.priceInputs.reduce((prev, curr) => {
      return prev.concat(curr);
    }));
  }

  getPriceInputs() {
    const priceInputs: DynamicInput<any>[][] = [];
    this.quoteItem.product.prices.forEach(price => {
      const priceInput: DynamicInput<any>[] = [];
      priceInput.push( new DynamicCheckbox({
        key: 'show_' + price.qty,
        label: price.qty,
        value: 1,
        required: false,
        order: 1
      }));
      priceInput.push( new DynamicTextbox({
        key: 'price_' + price.qty,
        label: 'Cost',
        value: price.price,
        required: false,
        order: 1
      }));
      priceInput.push( new DynamicTextbox({
        key: 'markup_' + price.qty,
        label: 'Markup',
        value: price.markup,
        required: false,
        order: 1
      }));
      priceInputs.push(priceInput);
    });
    return priceInputs;
  }
}
