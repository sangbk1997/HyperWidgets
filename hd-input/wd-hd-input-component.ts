/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {Component, OnInit} from '@angular/core';
import {ElementRef, Renderer2, Output, Input, EventEmitter, AfterViewInit, ViewChild} from '@angular/core';
import {TextareaComponent} from "../hd-textarea/wd-hd-textarea-component";

declare var $bean;

@Component({
  selector: 'hd-input',
  templateUrl: './wd-hd-input.html'
})
export class InputComponent extends TextareaComponent implements OnInit {
  @Input() model: object;
  @Input() property: string;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() emptyPlaceholder: string;
  @Input() iconPrepend: string;
  @Input() hydname: any;
  @Input() onFocus: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Input() type: string;
  @Input() commandvalue: string;
  public hasEmptyValue: boolean;
  @ViewChild('inputData') inputData: ElementRef;

  constructor(public elementRef: ElementRef, public render: Renderer2) {
    super(elementRef, render);
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

    if ($bean.isNil(this.model)) {
      this.model = {};
    }

    if ($bean.isNil(this.property)) {
      this.property = "";
    }

    if ($bean.isNil(this.onFocus)) {
      this.onFocus = false;
    }

    if ($bean.isNil(this.iconPrepend)) {
      this.iconPrepend = 'fas fa-pencil-alt';
    }
    if ($bean.isNil(this.type)) {
      this.type = 'text';
    }
    if ($bean.isNil(this.commandvalue)) {
      this.commandvalue = '';
    }
  }

  ngAfterViewInit() {
    let $this = this;
    setTimeout(function () {
      if ($bean.isNotNil($this.onFocus) && $this.onFocus) {
        $this.inputData.nativeElement.focus();
      }
    });
  }

  linkOnFocus() {
    if ($bean.isNotEmpty(this.model[this.property])) {
      this.hasEmptyValue = false;
    }
  }

  linkOnKeyup() {
    if ($bean.isNotEmpty(this.model[this.property])) {
      this.hasEmptyValue = false;
    } else {
      this.hasEmptyValue = true;
    }
    this.emitEvent();
  }

  resetValue() {
    this.model[this.property] = null;
    this.inputData.nativeElement.focus();
    this.hasEmptyValue = true;
    this.emitEvent();
  }

  private emitEvent() {
    if (this.onChange.observers.length > 0) {
      this.onChange.emit(this.model[this.property]);
    }
  }

}
