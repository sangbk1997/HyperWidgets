import {Directive, ElementRef, HostListener} from "@angular/core";
import {HdDropdownService} from "./hd-dropdown.service";

@Directive({
  selector: '[target-dropdown-id]'
})
export class HdTargetDropDownDirective {

  constructor(private elementRef: ElementRef, private dropDownService: HdDropdownService) {
  }
}
