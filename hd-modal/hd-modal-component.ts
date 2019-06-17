import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {HdModalService} from "./hd-modal.service";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {DynamicDirective} from "../../base/hyd-dynamic.directive";
declare var JProject;
declare var $bean;

@Component({
  selector: 'hd-modal',
  templateUrl: './hd-modal-component.html',
})
export class HdModalComponent implements OnInit {
  @ViewChild(DynamicDirective) dynamicDirective: DynamicDirective;
  private bean = $bean;

  constructor(private modalService: HdModalService,
              private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      modalService.removeModal();
    });
    // NavigationEnd
    // NavigationCancel
    // NavigationError
    // RoutesRecognized
  }

  ngOnInit() {
    this.modalService.viewContainerRef = this.dynamicDirective.getViewContainerRef();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.modalService.closeModalContain();
  }
}
