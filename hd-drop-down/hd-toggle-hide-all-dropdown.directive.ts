import {Directive, HostListener} from '@angular/core';
import {HdDropdownService} from "./hd-dropdown.service";

@Directive({
  selector: '[toggle-hide-all-dropdown]'
})
export class ToggleHideAllDropdownDirective {

  constructor(private dropDownService: HdDropdownService) {
  }

  @HostListener('click') toggleHideDropDown() {
    this.dropDownService.toggleHideAllDropDown();
  }
}
