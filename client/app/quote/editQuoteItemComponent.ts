import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {QuoteItem} from "../shared/quote/quote.model";
import {GazProduct} from "../shared/gazproduct/gazproduct.model";
import {GazProductService} from "../shared/gazproduct/gazProduct.service";
import {Subject} from "rxjs";
import {IAlert} from "../shared/customer/customer.alert";
import _ from "lodash";
import {QuoteService} from "../shared/quote/quote.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'edit-quote-item',
  templateUrl: './editQuoteItemComponent.html'
})
export class EditQuoteItemComponent {
  private modalRef: NgbModalRef;
  @Input() quoteItem: QuoteItem;
  @Input() product: GazProduct;
  @Input() quoteId: number;
  productId$ = new Subject<string>();
  productDTO: GazProduct;
  quoteItemForm: FormGroup;

  alert: IAlert;
  @Output() onQuoteItemUpdated = new EventEmitter<[QuoteItem, GazProduct]>();
  @Output() onQuoteItemCreated = new EventEmitter<[QuoteItem, GazProduct]>();
  @Output() onAlertCreated = new EventEmitter<IAlert>();

  constructor(private modalService: NgbModal, public gazProductService: GazProductService, public quoteService: QuoteService) {
  }

  changeProduct() {
    this.productId$.debounceTime(400)
      .distinctUntilChanged()
      .filter(pid => pid.length > 1)
      .switchMap(pid => {
        return this.gazProductService.getProduct(pid);
      }).subscribe(
      product => {
        this.productDTO = product;
        this.productName.setValue(product.productname);
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
    this.modalRef = this.modalService.open(content, {size: 'lg', beforeDismiss: this.reset});
    this.onOpen();
  }

  onOpen() {
    this.productDTO = this.product ? _.clone(this.product) : new GazProduct();
    if (!this.quoteItem) {
      this.quoteItem = new QuoteItem(this.quoteId);
    }
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
      this.quoteItem.quoteId,
      this.quoteItem.id,
      parseInt(this.productId.value, 10),
      parseFloat(this.quantity.value),
      this.colour.value,
      this.description.value,
      this.priceIncludes.value,
      parseFloat(this.cost.value),
      parseFloat(this.markup.value),
      this.sell.value ? parseFloat(this.sell.value) : null,
      parseFloat(this.vat.value)
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
            this.onQuoteItemCreated.emit([qi, this.productDTO]);
          } else { // quote updated
            this.onQuoteItemUpdated.emit([qi, this.productDTO]);
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
      'productId': new FormControl(this.productDTO.productid, [Validators.required, Validators.min(1), Validators.max(10000)]),
      'productName': new FormControl(this.productDTO.productname, [Validators.required]),
      'quantity': new FormControl(this.quoteItem.quantity, [Validators.required, Validators.min(1), Validators.max(10000)]),
      'colour': new FormControl(this.quoteItem.colour),
      'description': new FormControl(this.quoteItem.description),
      'priceIncludes': new FormControl(this.quoteItem.priceIncludes),
      'cost': new FormControl(this.quoteItem.cost, [Validators.required, Validators.min(0.01), Validators.max(10000)]),
      'markup': new FormControl(this.quoteItem.markup, [Validators.required, Validators.min(0), Validators.max(500)]),
      'sell': new FormControl(this.quoteItem.sell, [Validators.required, Validators.min(0), Validators.max(100000)]),
      'vat': new FormControl(this.quoteItem.vat, [Validators.required, Validators.min(0), Validators.max(100)])
    });
  }

  get productId() { return this.quoteItemForm.get('productId'); }
  get productName() { return this.quoteItemForm.get('productName'); }
  get quantity() { return this.quoteItemForm.get('quantity'); }
  get colour() { return this.quoteItemForm.get('colour'); }
  get description() { return this.quoteItemForm.get('description'); }
  get priceIncludes() { return this.quoteItemForm.get('priceIncludes'); }
  get cost() { return this.quoteItemForm.get('cost'); }
  get markup() { return this.quoteItemForm.get('markup'); }
  get sell() { return this.quoteItemForm.get('sell'); }
  get vat() { return this.quoteItemForm.get('vat'); }
}
