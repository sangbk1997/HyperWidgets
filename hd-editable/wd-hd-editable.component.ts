/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  Type,
  HostListener
} from '@angular/core';
import {TextEditorComponent} from "../hd-texteditor/wd-hd-texteditor.components";
import {InputComponent} from "../hd-input/wd-hd-input-component";
import {HdEditableService} from "./hd-editable.service";

declare var $bean;

@Component({
  selector: 'hd-editable',
  templateUrl: './wd-hd-editable.html'
})
export class EditableComponent implements OnInit, OnChanges {
  @Input() model: any;
  @Input() property: string;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() isDelete: boolean;
  @Input() hiddenProperty: boolean;
  @Input() resetValue: boolean;
  @Input() emptyPlaceholder: string;
  @Input() hydname: any;
  @Input() component: any;
  @Input() configs: any;
  @Input() textValue: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  public statusProcessUpdate: boolean;
  public isEmptyValue: boolean;
  public isManualPlaceholder: boolean;
  public oldValue: any;
  public differentEditableClass: number;
  public isShowContent: boolean = false;
  public modelClone: any = {};
  public data = {
    'model': {},
    'property': '',
    'requried': false,
    'disabled': false,
    'emptyPlaceholder': '',
    'hydname': '',
    'onFocus': true
  };

  public isUseSafeHtml: boolean = true;

  constructor(private elementRef: ElementRef, private render: Renderer2, private hdEditableService: HdEditableService) {
  }

  ngOnInit() {
    if ($bean.isNil(this.required)) {
      this.required = false;
    }
    if ($bean.isNil(this.disabled)) {
      this.disabled = false;
    }
    if ($bean.isNil(this.resetValue)) {
      this.resetValue = false;
    }
    if ($bean.isNil(this.hiddenProperty)) {
      this.hiddenProperty = false;
    }
    if ($bean.isNil(this.isDelete)) {
      this.isDelete = false;
    }
    if ($bean.isNotNil(this.textValue)) {
      this.isManualPlaceholder = true;
    }
    if ($bean.isNil(this.model)) {
      this.model = {};
    }
    if ($bean.isNil(this.property)) {
      this.property = "";
    }
    this.statusProcessUpdate = false;
    this.isEmptyValue = this.checkEmptyValue();
    if ($bean.isNil(this.component)) {
      this.component = TextEditorComponent
    }
    if (this.component == TextEditorComponent) {
      this.isUseSafeHtml = false;
    } else {
      this.isUseSafeHtml = true;
    }
    this.differentEditableClass = $bean.genRandomID(20);
  }

  ngOnChanges(changes: any) {
    if ($bean.isNotNil(this.model[this.property])) {
      this.isEmptyValue = this.checkEmptyValue();
    }
    if (changes['model']) {
      this.ngOnInit();
      this.data['model'] = this.modelClone;
      this.data['property'] = this.property;
      this.data['required'] = this.required;
      this.data['disabled'] = this.disabled;
      this.data['emptyPlaceholder'] = this.emptyPlaceholder;
      this.data['hydname'] = this.hydname;
    }
  }

  update(event) {
    this.statusProcessUpdate = false;
    this.modelClone[this.property] = this.model[this.property];
    if (this.resetValue) {
      this.modelClone[this.property] = null;
    }
    this.hdEditableService.hideHdEditableUpdateBox(event);
    if (!this.disabled) {
      setTimeout(() => {
        this.statusProcessUpdate = true;
      }, 0)
      if ($bean.isNotEmpty(this.model[this.property])) {
        this.oldValue = this.model[this.property];
      } else {
        this.oldValue = '';
      }
      event.stopPropagation();
    }
  }

  doSubmit() {
    let $this = this;
    this.model[this.property] = this.modelClone[this.property];
    this.onSubmit.emit(this.model[this.property]);
    this.statusProcessUpdate = false;
    if (this.resetValue) {
      this.modelClone[this.property] = null;
      setTimeout(function () {
        $this.statusProcessUpdate = true;
      });
    } else {
      this.isEmptyValue = this.checkEmptyValue();
    }
  }

  cancelUpdate() {
    this.model[this.property] = this.oldValue;
    this.statusProcessUpdate = false;
  }

  doDelete() {
    this.onDelete.emit(this.model[this.property]);
    this.statusProcessUpdate = false;
    this.isEmptyValue = this.checkEmptyValue();
  }

  checkEmptyValue() {
    if ($bean.isEmpty(this.model[this.property]) || this.model[this.property] === '<pre></pre>') {
      return true;
    }
    return false;
  }

  detachUpdateboxHdEditable() {
    this.statusProcessUpdate = false;
  }
}

