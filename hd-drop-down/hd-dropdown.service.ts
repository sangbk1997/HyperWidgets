import {ComponentFactoryResolver, Inject, Injectable, Renderer2, Type, ViewContainerRef} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {HdDatePickerService} from "../hd-date-picker/hd-date-picker.service";
declare var $bean;
declare var $;
declare var JProject;

@Injectable({
  providedIn: 'root'
})

export class HdDropdownService {
  dropdownIdActives: string[] = [];
  targetDropdown: any;
  triggerDropdown: any;
  renderer: Renderer2;
  viewContainerRef: ViewContainerRef;
  componentRef: any;
  triggerDropDown: any;
  dropdownId: any;

  constructor(@Inject(DOCUMENT) document,
              private datePickerService: HdDatePickerService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  addDropDown(dropdownId: string) {
    this.dropdownIdActives.push(dropdownId);
  }

  toggleHideDropDown(dropdownId?: any) {
    if (this.dropdownIdActives.length >= 1) {
      let currentDropDownId: any;
      if ($bean.isNotNil(dropdownId)) {
        currentDropDownId = dropdownId;
        this.targetDropdown = document.querySelector("[target-dropdown-id=" + currentDropDownId + "]");
      } else {
        currentDropDownId = this.dropdownIdActives[this.dropdownIdActives.length - 1];
        this.targetDropdown = document.querySelector("[target-dropdown-id=" + currentDropDownId + "]");
        this.checkClickInsideDynamicDropdown(this.targetDropdown);
      }
      if (this.dropdownIdActives.indexOf(currentDropDownId) != -1) {
        this.dropdownIdActives.splice(this.dropdownIdActives.indexOf(currentDropDownId), 1)
      }
      this.triggerDropdown = document.querySelector("[dropdown-id=" + currentDropDownId + "]");
      if ($bean.isNotNil(this.targetDropdown)) {
        this.renderer.removeClass(this.targetDropdown, 'cal-pos');
        this.renderer.removeClass(this.targetDropdown, 'active');
      }
      if ($bean.isNotNil(this.triggerDropdown)) {
        this.renderer.removeClass(this.triggerDropdown, 'trigger-active');
      }
    } else {
      this.removeDropdown();
    }
  };

  toggleHideAllDropDown() {
    let dropdownIdActiveClone = [];
    if ($bean.isNotEmpty(this.dropdownIdActives)) {
      dropdownIdActiveClone = $bean.clone(this.dropdownIdActives);
    }
    for (let dropdownId of dropdownIdActiveClone) {
      this.renderer.removeClass(document.querySelector("[target-dropdown-id=" + dropdownId + "]"), 'active');
      this.renderer.removeClass(document.querySelector("[dropdown-id=" + dropdownId + "]"), 'trigger-active');
    }
    this.removeDropdown();
    this.dropdownIdActives = [];
  };

  //Đóng dropdown hiện tại khi click ra ngoài DOM hiển thị
  public checkClickOuter(event) {
    this.checkClickInsideStaticDropdown(event);
    this.checkClickInsideDynamicDropdown(event.target);
  }

  showDropdown(event, component: Type<any>, data?: any, triggerByTarget?: boolean): void {
    //create new Dropdown
    if (this.viewContainerRef.length == 0) {
      this.createComponent(event, component, data, triggerByTarget);
    } else {
      this.removeDropdown();
      if (!event.target.contains(this.triggerDropDown) && !this.triggerDropDown.contains(event.target)) {
        this.createComponent(event, component, data, triggerByTarget);
      }
    }
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  removeDropdown(): void {
    if ($bean.isNotNil(this.renderer) && $bean.isNotNil(this.triggerDropDown)) {
      this.renderer.removeClass(this.triggerDropDown, "trigger-active");
    }
    this.viewContainerRef.clear();
  }

  createComponent(event, component: Type<any>, data?: any, triggerByTarget?: boolean) {
    this.dropdownId = $bean.genRandomID();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.triggerDropDown = event.currentTarget;
    // Used for gantt-chart
    if (triggerByTarget) {
      this.triggerDropDown = event.target;
    }
    this.viewContainerRef = this.viewContainerRef;
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    let zIndexDialog = $bean.clone(JProject.zIndexDialog);
    this.componentRef.location.nativeElement.style.zIndex = zIndexDialog + this.dropdownIdActives.length + this.viewContainerRef.length;
    this.componentRef.location.nativeElement.style.position = "relative";
    this.renderer.addClass(this.componentRef.location.nativeElement.querySelector(".app-dlg"), this.dropdownId);
    this.renderer.addClass(this.triggerDropDown, this.dropdownId);
    this.renderer.addClass(this.triggerDropDown, "trigger-active");
    for (let key in data) {
      if (data[key] != null) {
        this.componentRef.instance[key] = data[key];
      }
    }
    this.componentRef.changeDetectorRef.detectChanges();
    $bean.showPosInProject($(this.triggerDropDown), $(this.componentRef.location.nativeElement.querySelector(".app-dlg")), true);
    // Close DateRangeSearch(Update)Box if it is exist !
    // if (this.hdDateTimeService.isActivatedDateTimeRange) {
    //   this.hdDateTimeService.removeDateTimeRangeBox();
    // }
    this.checkClickInsideStaticDropdown(event);
    event.stopPropagation();
  }

  checkClickInsideDynamicDropdown(target) {
    if (this.viewContainerRef.length > 0) {
      let clickedInside = this.componentRef.location.nativeElement.contains(target);
      if (!clickedInside) {
        this.removeDropdown();
      }
    }
  }

  checkClickInsideStaticDropdown(event) {
    let dropdownIdActiveClone = [];
    if ($bean.isNotEmpty(this.dropdownIdActives)) {
      dropdownIdActiveClone = $bean.clone(this.dropdownIdActives);
    }
    let clickedInside = false;
    //Không đóng drop down khi click trên date picker
    if (this.datePickerService.isActive) {
      return;
    }
    for (let dropdownId of dropdownIdActiveClone) {
      let element = document.querySelector("[target-dropdown-id=" + dropdownId + "]");
      if ($bean.isNotEmpty(element)) {
        clickedInside = element.contains(event.target);
      }
      if (!clickedInside) {
        this.toggleHideDropDown(dropdownId);
      }
    }
  }
}
