import {Directive, HostListener} from "@angular/core";
import {HdModalService} from "./hd-modal.service";

@Directive({
  selector: '[hd-modal-close]'
})
export class HdModalCloseDirective {

  constructor(private modalService: HdModalService) {
  }

  @HostListener('click', ['$event'])
  onClick($event) {
   this.modalService.closeModalContain();
  }
}
