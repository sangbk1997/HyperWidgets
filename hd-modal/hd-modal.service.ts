import {ComponentFactoryResolver, Inject, Injectable, Type, ViewContainerRef, Renderer2} from "@angular/core";
import {HdDropdownService} from "../hd-drop-down/hd-dropdown.service";
import {DialogInnerComponent} from "./dialog-inner/dialog-inner.component";
import {DOCUMENT} from "@angular/common";
declare var JProject;
declare var $bean;

@Injectable({
  providedIn: 'root'
})
export class HdModalService {
  viewContainerRef: ViewContainerRef;
  viewContainerModalItemRef: ViewContainerRef;
  renderer: Renderer2;

  constructor(@Inject(DOCUMENT) document,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dropDownService: HdDropdownService) {
  }

  showModal(component: Type<any>, data?: any): void {
    let randomId = $bean.genRandomID(20);
    //create dialog inner
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogInnerComponent);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.viewContainerModalItemRef = componentRef.instance["modalItemDirective"].getViewContainerRef();
    this.viewContainerRef = this.viewContainerRef;
    this.viewContainerModalItemRef = this.viewContainerModalItemRef;

    //create modal item
    let componentFactoryModalItem = this.componentFactoryResolver.resolveComponentFactory(component);
    let componentRefModalItem = this.viewContainerModalItemRef.createComponent(componentFactoryModalItem);

    //create overlay and set z-index,id for overlay and modal item
    let div = this.renderer.createElement('div');
    this.renderer.addClass(div, "overlay-modal");
    this.renderer.setAttribute(div, "id", randomId);
    this.renderer.setStyle(div, "z-index", 100 + this.viewContainerRef.length);
    const parent = componentRef.location.nativeElement.parentNode;
    const refChild = componentRef.location.nativeElement;
    this.renderer.addClass(refChild, "dialog-inner");
    this.renderer.setAttribute(refChild, "dialog-id", randomId);
    this.renderer.setStyle(refChild, "z-index", 100 + this.viewContainerRef.length);
    this.renderer.insertBefore(parent, div, refChild);
    componentRefModalItem.location.nativeElement.style.zIndex = 100 + this.viewContainerRef.length;
    JProject.zIndexDialog = 100 + this.viewContainerRef.length;
    for (let key in data) {
      if (data[key] != null) {
        componentRefModalItem.instance[key] = data[key];
      }
    }
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }

  closeModalContain(): void {
    if (this.viewContainerRef.length >= 1) {
      this.removeOverlayAndModalItem(this.viewContainerRef.length - 1)
    }
    this.setzIndexDialog();
  }

  closeModalBeforeContain(): void {
    if (this.viewContainerRef.length >= 2) {
      this.removeOverlayAndModalItem(this.viewContainerRef.length - 2)
    }
    this.setzIndexDialog();
    JProject.zIndexDialog = 100 + this.viewContainerRef.length;
  }

  removeModal(): void {
    if ($bean.isNotNil(this.viewContainerRef)) {
      this.viewContainerRef.clear();
      let overlayElements = document.getElementsByClassName("overlay-modal");
      let lengthOfOverlayElements = 0;
      if ($bean.isNotNil(overlayElements) && overlayElements.length > 0) {
        lengthOfOverlayElements = overlayElements.length;
      }
      for (let i = 0; i < lengthOfOverlayElements; i++) {
        let item = overlayElements[overlayElements.length - 1];
        item.remove();
      }
      this.setzIndexDialog();
    }
  }

  private setzIndexDialog() {
    JProject.zIndexDialog = 100 + this.viewContainerRef.length;
  }

  private removeOverlayAndModalItem(index) {
    let element: any = this.viewContainerRef.get(index);
    let nativeElement = element.rootNodes[0];
    let dialogId = nativeElement.getAttribute("dialog-id");
    document.getElementById(dialogId).remove();
    this.viewContainerRef.remove(index);
  }
}
