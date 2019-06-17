/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from "@angular/core";

declare var $bean;

@Component({
  selector: 'hd-select',
  templateUrl: './wd-hd-select.html'
})

export class SelectComponent implements OnInit {
  @Input() groupName: string;
  @Input() model: any;
  @Input() property: any;
  @Input() dSource ?: any;
  @Input() fieldValue: string;
  @Input() fieldTitle: string;
  @Input() emptyPlaceholder: string;
  @Input() disabled: boolean;
  @Input() iconPrepend: string;
  @Input() emptyValue: any;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  public isEmptyValue: boolean;
  public acceptEmptyValue: boolean;
  @ViewChild('selectElement') selectElement: ElementRef;

  constructor(private elementRef: ElementRef, render: Renderer2) {
  }

  ngOnInit() {
    if ($bean.isNil(this.disabled)) {
      this.disabled = false;
    }
    if ($bean.isNil(this.fieldValue)) {
      this.fieldValue = 'value';
    }
    if ($bean.isNil(this.fieldTitle)) {
      this.fieldTitle = 'title';
    }
    if ($bean.isNil(this.groupName)) {
      this.groupName = "Select box";
    }
    if ($bean.isNil(this.model)) {
      this.model = {};
    }
    if ($bean.isNil(this.property)) {
      this.property = "";
    }
    if ($bean.isNil(this.emptyPlaceholder)) {
      this.acceptEmptyValue = false;
    } else {
      this.acceptEmptyValue = true;
    }
    if ($bean.isNil(this.emptyValue)) {
      this.emptyValue = '';
    }
    this.iconPrepend = this.iconPrepend || 'fa fa-list';
  }

  linkOnSave() {
    if ($bean.isNotNil(this.property) && $bean.isNotEmpty(this.model)) {
      this.model[this.property] = this.selectElement.nativeElement.value;
    }
    if (this.onChange.observers.length > 0) {
      let value;
      let item;
      let typeofKey = typeof (this.dSource[0][this.fieldValue]);
      if (typeofKey == 'number') {
        value = parseInt(this.selectElement.nativeElement.value);
      } else {
        value = this.selectElement.nativeElement.value;
      }
      item = $bean.getById(this.dSource, value);
      this.onChange.emit(item);
    }
  }

  isSelected(item) {
    if (item[this.fieldValue] === this.model[this.property]) {
      return true;
    }
    return false;
  }

}
