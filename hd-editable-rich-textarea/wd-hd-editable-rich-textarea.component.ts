/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {Component, OnInit, OnChanges} from '@angular/core';
import {ElementRef, Renderer2, Output, Input, EventEmitter, ViewChild} from '@angular/core';

declare var $bean;

@Component({
  selector: 'hd-editable-rich-textarea',
  templateUrl: './wd-hd-editable-rich-textarea.html'
})
export class EditableRichTextareaComponent implements OnInit, OnChanges {
  @Input() model: any;
  @Input() property: string;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() emptyPlaceholder: string;
  @Input() hydname: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  public statusProcessUpdate: boolean;
  public isEmptyValue: boolean;
  public oldValue: any;

  constructor(private elementRef: ElementRef, private render: Renderer2) {
  }

  ngOnInit() {
    if ($bean.isNil(this.required)) {
      this.required = false;
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

    this.statusProcessUpdate = false;
    this.isEmptyValue = this.checkEmptyValue();
  }

  ngOnChanges(changes: any) {
    if ($bean.isNotNil(this.model[this.property])) {
      this.isEmptyValue = this.checkEmptyValue();
    }
  }

  linkOnChange() {
    // console.log(this.model[this.property]);
  }

  update() {
    this.statusProcessUpdate = true;
    if ($bean.isNotEmpty(this.model[this.property])) {
      this.oldValue = this.model[this.property];
    } else {
      this.oldValue = '';
    }
  }

  toggleBoxUpdate() {
    if (this.statusProcessUpdate) {
      this.statusProcessUpdate = false;
    }
    else {
      this.statusProcessUpdate = true;
    }
  }

  doSubmit() {
    this.onSubmit.emit(this.model[this.property]);
    this.statusProcessUpdate = false;
    this.isEmptyValue = this.checkEmptyValue();
  }

  cancelUpdate() {
    this.model[this.property] = this.oldValue;
    this.statusProcessUpdate = false;
  }

  checkEmptyValue() {
    if ($bean.isEmpty(this.model[this.property])) {
      return true;
    }
    return false;
  }

}
