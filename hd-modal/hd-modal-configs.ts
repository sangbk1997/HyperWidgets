import {AfterContentInit, HostBinding, Injectable, Injector} from "@angular/core";
import {HdModalService} from "./hd-modal.service";
@Injectable()
export abstract class HdModalConfigs implements AfterContentInit {
  protected largest: boolean = false;
  protected animate: string = 'down';
  protected hideClose: boolean = false;
  @HostBinding('class') animateType: string;
  @HostBinding('class.modal-item') name: boolean = true;
  @HostBinding('class.largest') isLargest: boolean;
  @HostBinding('class.is-hide-close') isHideClose: boolean;
  protected modalService: HdModalService;

  constructor(injector: Injector) {
    this.modalService = injector.get(HdModalService);
  }

  ngAfterContentInit(): void {
    this.animateType = this.animate;
    this.isLargest = this.largest;
    this.isHideClose = this.hideClose;
  }
}
