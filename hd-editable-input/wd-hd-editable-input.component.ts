/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {Component, OnInit} from '@angular/core';
import {ElementRef, Renderer2, Output, Input, EventEmitter, OnChanges, AfterViewInit, ViewChild} from '@angular/core';
declare var $bean;

@Component({
  selector: 'hd-editable-input',
  templateUrl: './wd-hd-editable-input.html'
})
export class EditableInputComponent implements OnInit, OnChanges {
  @Input() model: object;
  @Input() property: string;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() emptyPlaceholder: string;
  @Input() hydname: any;
  @Input() configs: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  public hasEmptyValue: boolean;
  public statusProcessUpdate: boolean;
  public isEmptyValue: boolean;
  public oldValue: any;
  @ViewChild('inputData') inputData: ElementRef;
  constructor(private elementRef: ElementRef, private render: Renderer2) {
  }

  ngOnInit() {
    if ($bean.isNil(this.required)) {
      this.required = false;
    }

    if ($bean.isNil(this.disabled)) {
      this.disabled = false;
    }

    if ($bean.isNil(this.hasEmptyValue)) {
        this.hasEmptyValue = true;
    }

    if($bean.isNil(this.model)){
      this.model = {};
    }

    if($bean.isNil(this.property)){
      this.property = "";
    }

    this.statusProcessUpdate = false;

  }

  ngOnChanges(changes: any){
    if($bean.isNotNil(this.model[this.property])){
      this.isEmptyValue = this.checkEmptyValue();
    }
  }

  linkOnFocus(){
    if($bean.isNotEmpty(this.model[this.property])){
      this.hasEmptyValue = false;
    }
  }

  linkOnKeyup() {
    if ($bean.isNotEmpty(this.model[this.property])) {
      this.hasEmptyValue = false;
    } else {
      this.hasEmptyValue = true;
    }
  }

  resetValue() {
    this.model[this.property] = null;
    this.inputData.nativeElement.focus();
    this.hasEmptyValue = true;
  }

  update(event){
    this.statusProcessUpdate = true;
    if($bean.isNotEmpty(this.model[this.property])){
      this.oldValue = this.model[this.property];
    }else{
      this.oldValue = '';
    }
  }

  checkEmptyValue(){
    if($bean.isEmpty(this.model[this.property])){
      return true;
    }
    return false;
  }

  doSubmit(){
    this.onSubmit.emit(this.model[this.property]);
    this.statusProcessUpdate = false;
    this.isEmptyValue = this.checkEmptyValue();
  }

  cancelUpdate(){
    this.model[this.property] = this.oldValue;
    this.statusProcessUpdate = false;
  }

}
