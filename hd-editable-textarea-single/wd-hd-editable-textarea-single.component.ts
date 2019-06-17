/**
 * Created by thaidh_vdi on 1/9/2019.
 */
import {Component, OnInit, OnChanges} from '@angular/core';
import {ElementRef, Renderer2, Output, Input, EventEmitter, ViewChild, HostListener} from '@angular/core';
declare var $bean;
@Component({
  selector: 'hd-editable-textarea-single',
  templateUrl: './wd-hd-editable-textarea-single.html'
})
export class EditableTextareaSingleComponent implements OnInit, OnChanges {
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
  @ViewChild('textArea', {read: ElementRef}) textArea: ElementRef;

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
  }

  @HostListener('click', ['$event']) toggle(event) {
    this.autoGrow();
  }

  ngOnChanges(changes: any) {
    if ($bean.isNotNil(this.model[this.property])) {
      this.isEmptyValue = this.checkEmptyValue();
    }
    if (changes['model']) {
      this.ngOnInit();
    }
  }

  linkOnChange() {
    // console.log(this.model[this.property]);
  }

  update() {
    let $this = this;
    this.statusProcessUpdate = true;
    if ($bean.isNotEmpty(this.model[this.property])) {
      this.oldValue = this.model[this.property];
    } else {
      this.oldValue = '';
    }
    setTimeout(function () {
      if($bean.isNotNil($this.textArea)){
        $this.textArea.nativeElement.focus();
      }
    }, 300);
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

  public autoGrow() {
    if ($bean.isNotEmpty(this.textArea)) {
      const textArea = this.textArea.nativeElement;
      textArea.style.overflow = 'hidden';
      textArea.style.wordWrap = 'break-word';
      textArea.style.resize = 'none';
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }

  onKeyDownEvent(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.doSubmit();
    }
  }
}

