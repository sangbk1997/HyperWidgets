import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[hd-dropdown-item]'
})
export class HdDropdownItemDirective {

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  getViewContainerRef() {
    return this.viewContainerRef;
  }
}
