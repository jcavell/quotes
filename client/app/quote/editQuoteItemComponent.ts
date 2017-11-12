import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {QuoteItem} from "../shared/quote/quote.model";
import {GazProduct} from "../shared/gazproduct/gazproduct.model";
import {GazProductService} from "../shared/gazproduct/gazProduct.service";
import {Subject} from "rxjs";
import {IAlert} from "../shared/customer/customer.alert";
import _ from "lodash";
import {QuoteService} from "../shared/quote/quote.service";


@Component({
  selector: 'edit-quote-item',
  templateUrl: './editQuoteItemComponent.html'
})
export class EditQuoteItemComponent {
  private modalRef: NgbModalRef;
  @Input() quoteItem: QuoteItem;
  @Input() product: GazProduct;
  productDTO: GazProduct;
  quoteItemDTO: QuoteItem;
  productId$ = new Subject<string>();

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
    this.quoteItemDTO = this.quoteItem ? _.clone(this.quoteItem) : new QuoteItem();
    this.changeProduct();
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
    this.quoteItemDTO.productId = this.productDTO.productid; // copy across product id

    const quoteIsNew = this.quoteItemDTO.id === undefined;
    const quoteHasChanged = !_.isEqual(this.quoteItem, this.quoteItemDTO);

    if (quoteHasChanged) {
      this.quoteService.upsertQuoteItem(this.quoteItemDTO).subscribe(
        quoteItem => {
          this.onAlertCreated.emit({
            type: 'success',
            message: 'Quote item for product id ' + quoteItem.productId + ' ' + quoteIsNew ? 'created' : 'updated'
          });

          if (quoteIsNew) {
            this.onQuoteItemCreated.emit([quoteItem, this.productDTO]);
          } else { // quote updated
            this.onQuoteItemUpdated.emit([quoteItem, this.productDTO]);
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
}
