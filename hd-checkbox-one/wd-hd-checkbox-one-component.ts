/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {ElementRef, Renderer2, Input, Output, Component, OnInit, EventEmitter} from '@angular/core';

declare var $bean;

@Component({
  selector: 'hd-checkbox-one',
  templateUrl: './wd-hd-checkbox-one.component.html'
})
export class CheckboxOneComponent implements OnInit {
  @Input() model: any;
  @Input() property: any;
  @Input() value: any;
  @Input() label: any;
  @Input() disabled: any;
  @Input() checked: boolean;
  @Input() styleClass: any;
  @Output() onChange = new EventEmitter();
  public oldValue: any;

  constructor(private elementRef: ElementRef, private render: Renderer2) {
  }

  ngOnInit() {
    if ($bean.isNil(this.disabled)) {
      this.disabled = false;
    }
    if ($bean.isNil(this.checked)) {
      this.checked = false;
    }
    if ($bean.isNil(this.label)) {
      this.label = "";
    }
    if ($bean.isNotNil(this.model) && $bean.isNotNil(this.property)) {
      this.oldValue = this.model[this.property];
    }
    if ($bean.isNotNil(this.value) && (this.checked == true) && $bean.isNotNil(this.model) && $bean.isNotNil(this.property)) {
      this.model[this.property] = this.value;
    }
  }

  linkOnChange() {
    this.checked = !this.checked;
    if ($bean.isNotNil(this.model) && $bean.isNotNil(this.property)) {
      if (this.checked) {
        if ($bean.isNil(this.value)) {
          this.model[this.property] = true;
        } else {
          this.model[this.property] = this.value;
        }
      } else {
        if ($bean.isNotEmpty(this.model[this.property])) {
          this.model[this.property] = false;
        } else {
          this.model[this.property] = this.oldValue;
        }
      }
      this.onChange.emit(this.model[this.property]);
    } else {
      this.onChange.emit(this.checked);
    }
  }
}
