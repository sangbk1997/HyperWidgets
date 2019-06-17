import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[hd-modal-item]',
})
export class HdModalItemDirective {
  constructor(private viewContainerRef: ViewContainerRef) {
  }

  getViewContainerRef() {
    return this.viewContainerRef;
  }
}
