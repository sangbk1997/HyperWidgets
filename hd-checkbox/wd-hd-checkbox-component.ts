/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {ElementRef, Renderer2, Input, Output, Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
declare var $bean;
declare var JCommonUtil;
@Component({
  selector: 'hd-checkbox',
  templateUrl: './wd-hd-checkbox.html'
})
export class CheckboxComponent implements OnInit {
  @Input() model: any;
  @Input() property: any;
  @Input() dSource: any;
  @Input() fieldValue: string;
  @Input() fieldTitle: string;
  @Input() customStyle: any;
  @Input() checkAllLabel: any;
  @Input() showCheckAll: boolean;
  @Input() disabled: any;

  constructor(private elementRef: ElementRef, private render: Renderer2) {
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
    if($bean.isNil(this.showCheckAll)){
      this.showCheckAll = false;
    }
    if ($bean.isNil(this.checkAllLabel)) {
      this.checkAllLabel = JCommonUtil.message('ipm.common.choose.all');
    }
    if ($bean.isEmpty(this.model[this.property])) {
      this.model[this.property] = [];
    }
  }

  isItemValueSelected(item: object) {
    if (this.model[this.property].indexOf(item[this.fieldValue]) != -1) {
      return true;
    } else {
      return false;
    }
  }

  toggleItemValue(item: object) {
    var indexOf = this.model[this.property].indexOf(item[this.fieldValue]);
    if (indexOf != -1) {
      this.model[this.property].splice(indexOf, 1);
    } else {
      this.model[this.property].push(item[this.fieldValue]);
    }
  }

  checkAll() {
    if (this.model[this.property] != null && this.model[this.property].length == this.dSource.length) {
      this.model[this.property] = [];
    } else {
      this.model[this.property] = $bean.list(this.dSource, this.fieldValue, false);
    }
  }

}
