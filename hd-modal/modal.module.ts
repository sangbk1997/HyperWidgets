import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {BaseModule} from "../../base/base.module";
import {HdModalComponent} from "./hd-modal-component";
import {HdModalItemDirective} from "./hd-modal-item.directive";
import {HdModalCloseDirective} from "./hd-modal-close.directive";
import {HdModalXComponent} from "./hd-modal-x-component";
import {HdModalX2Component} from "./hd-modal-x-2-component";
import {DialogInnerComponent} from "./dialog-inner/dialog-inner.component";

declare var JGlobal;

@NgModule({
  declarations: [
    HdModalComponent,
    HdModalItemDirective,
    HdModalCloseDirective,
    HdModalXComponent,
    HdModalX2Component,
    DialogInnerComponent
  ],
  imports: [
    BaseModule
  ],
  providers: [],
  bootstrap: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  entryComponents: [DialogInnerComponent],
  exports: [
    HdModalComponent,
    HdModalXComponent,
    HdModalX2Component,
    HdModalCloseDirective,
  ]
})
export class ModalModule {
}
