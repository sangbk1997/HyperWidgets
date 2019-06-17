/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
declare var $bean;
@Component({
  selector: 'hd-radio',
  templateUrl: './wd-hd-radio.html'
})
export class RadioComponent implements OnInit {
  @Input() model: any;
  @Input() property: any;
  @Input() disabled: boolean;
  @Input() groupName: any;
  @Input() dSource: any;
  @Input() fieldValue: string;
  @Input() fieldTitle: string;
  @Input() itemSelected: any;
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if ($bean.isNil(this.groupName)) {
      this.groupName = 'GroupRadio';
    }
    if ($bean.isNil(this.fieldValue)) {
      this.fieldValue = 'value';
    }
    if ($bean.isNil(this.fieldTitle)) {
      this.fieldTitle = 'title';
    }
    if ($bean.isNil(this.disabled)) {
      this.disabled = false;
    }
    if ($bean.isNil(this.model)) {
      this.model = {};
    }
    if ($bean.isNil(this.property)) {
      this.property = "";
    }
  }

  chooseItemValue(item: object) {
    this.model[this.property] = item[this.fieldValue];
    if (this.onChange.observers.length > 0) {
      this.onChange.emit(this.model[this.property]);
    }
  }
}
