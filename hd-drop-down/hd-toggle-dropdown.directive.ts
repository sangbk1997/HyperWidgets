import {Directive, ElementRef, EventEmitter, HostListener, Inject, Output, Input, Renderer2} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {HdModalService} from "../hd-modal/hd-modal.service";
import {HdDropdownService} from "./hd-dropdown.service";
import {HdDateTimeService} from "../hd-date-range/hd-date-time.service";

declare var $bean;
declare var $;
declare var JProject;
declare var $ng;

@Directive({
  selector: '[toggle-dropdown]'
})
export class HdToggleDropDownDirective {
  targetDropdown: any;
  triggerDropDown: any;
  @Input() showCaret: boolean = true;
  @Output() beforeShow = new EventEmitter();

  constructor(private elementRef: ElementRef,
              private dropDownService: HdDropdownService,
              @Inject(DOCUMENT) document,
              private renderer: Renderer2,
              private hdDateTimeService: HdDateTimeService,
              private modalService: HdModalService) {
    dropDownService.renderer = renderer;
  }

  @HostListener('click', ['$event']) toggle(event) {
    this.triggerDropDown = event.currentTarget;
    if (this.beforeShow.observers.length > 0) {
      this.beforeShow.emit();
    }
    let dropdownId = this.triggerDropDown.getAttribute("dropdown-id");
    if ($bean.isNotEmpty(dropdownId)) {
      this.targetDropdown = document.querySelector("[target-dropdown-id=" + dropdownId + "]");
    }
    if ($bean.isNil(this.targetDropdown)) {
      return;
    }
    this.renderer.addClass(this.targetDropdown, 'cal-pos');
    this.renderer.addClass(this.targetDropdown, 'active');
    let zIndexDialog = $bean.clone(JProject.zIndexDialog);
    this.targetDropdown.style.zIndex = zIndexDialog + this.dropDownService.dropdownIdActives.length + this.dropDownService.viewContainerRef.length;
    this.renderer.addClass(this.triggerDropDown, 'trigger-active');
    $bean.showPosInProject($(this.triggerDropDown), $(this.targetDropdown), this.showCaret);
    if (this.dropDownService.dropdownIdActives.indexOf(this.triggerDropDown.getAttribute("dropdown-id")) == -1) {
      this.dropDownService.checkClickOuter(event);
      this.dropDownService.addDropDown(this.triggerDropDown.getAttribute("dropdown-id"));
      // Close DateRangeSearch(Update)Box if it is exist !
      if (this.hdDateTimeService.isActivatedDateTimeRange) {
        this.hdDateTimeService.removeDateTimeRangeBox();
      }
      event.stopPropagation();
    }
    let $this = this;
  }
}
