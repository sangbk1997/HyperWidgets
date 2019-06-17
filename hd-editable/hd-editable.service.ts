import {Injectable} from '@angular/core';

declare var $bean;
declare var $;

@Injectable({
  providedIn: 'root'
})
export class HdEditableService {
  constructor() {
  }

  hideHdEditableUpdateBox(event) {
    if (!event.target.classList.contains('check-list-complete-percent-update-box') && ($(event.target).parents('.check-list-complete-percent-update-box').length <= 0)) {
      $('.check-list-complete-percent-update-box').hide();
      $('.check-list-complete-percent-content').show();
    }
  }
}
;
