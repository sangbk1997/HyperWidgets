import {Directive, HostListener} from "@angular/core";
import {HdDropdownService} from "./hd-dropdown.service";

@Directive({
  selector: '[toggle-hide-dropdown]'
})
export class HdToggleHideDropDownDirective {

  constructor(private dropDownService: HdDropdownService) {
  }

  @HostListener('click') toggleHideDropDown() {
    this.dropDownService.toggleHideDropDown();
  }
}
