import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {HdDropdownService} from "./hd-dropdown.service";
import {HdDropdownItemDirective} from "./hd-dropdown-item.directive";

@Component({
  selector: 'hd-dropdown',
  templateUrl: './hd-dropdown.component.html',
  styles: [],
})
export class HdDropdownComponent implements OnInit {
  @ViewChild(HdDropdownItemDirective) dropdownItemDirective: HdDropdownItemDirective;

  constructor(private router: Router,
              private dropDownService: HdDropdownService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.dropDownService.removeDropdown();
    });
  }

  ngOnInit() {
    this.dropDownService.setViewContainerRef(this.dropdownItemDirective.getViewContainerRef());
  }
}
