import {Component, OnInit, ViewChild} from "@angular/core";
import {HdModalItemDirective} from "../hd-modal-item.directive";

@Component({
  selector: 'hc-dialog-inner',
  templateUrl: './dialog-inner.component.html',
  styles: []
})
export class DialogInnerComponent implements OnInit {
  @ViewChild(HdModalItemDirective) modalItemDirective: HdModalItemDirective;

  constructor() {
  }

  ngOnInit() {
  }

}
