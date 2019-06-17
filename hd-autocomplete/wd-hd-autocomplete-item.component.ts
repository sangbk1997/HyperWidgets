/**
 * Created by ihcmtest01_vdi on 11/12/2018.
 */
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'hd-autocomplete-item',
  template: '<div class="emp-box-info"><span class="ebi-name">{{data[title]}}</span></div>'
})
export class AutoCompleteItemComponent implements OnInit {
  data: any = {};
  title: string = 'title';

  constructor() {
  }

  ngOnInit(): void {
  }
}
