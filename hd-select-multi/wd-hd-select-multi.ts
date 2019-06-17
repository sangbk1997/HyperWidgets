/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {
  ElementRef,
  Renderer2,
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  EventEmitter, HostListener
} from '@angular/core';

declare var $bean;
declare var JCommonUtil;
declare var $;

@Component({
  selector: 'hd-select-multi',
  templateUrl: './wd-hd-select-multi.html'
})

export class SelectMultiComponent implements OnInit {
  @Input() model: any;
  @Input() property: any;
  @Input() dSource ?: any;
  @Input() separatorTitle: any;
  @Input() searchText: string;
  @Input() fieldValue: string;
  @Input() fieldTitle: string;
  @Input() emptyPlaceholder: string;
  @Input() disabled: boolean;
  public itemListSelected: any;
  public dSourceClone: any;
  public itemSelected: any;
  public inputSearch: any;
  public suggestBox: any;
  public markElement: any;
  public inputSearchElement: any;
  public suggestBoxElement: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    var $this = this;
    if ($bean.isNil(this.model)) {
      this.model = {};
    }
    if ($bean.isNil(this.property)) {
      this.property = "";
    }
    if ($bean.isNil(this.disabled)) {
      this.disabled = false;
    }
    if ($bean.isNil(this.fieldValue)) {
      this.fieldValue = 'value';
    }
    if ($bean.isNil(this.fieldTitle)) {
      this.fieldTitle = 'title';
    }
    if ($bean.isNil(this.emptyPlaceholder)) {
      this.emptyPlaceholder = JCommonUtil.message('ipm.label.addEmp');
    }
    this.itemListSelected = [];
    this.dSourceClone = this.dSource;
    this.inputSearch = $bean.genRandomID(20);
    this.suggestBox = $bean.genRandomID(20);
    this.markElement = $bean.genRandomID(20);
    setTimeout(function () {
      $this.inputSearchElement = $('#' + $this.inputSearch);
      $this.suggestBoxElement = $('#' + $this.suggestBox);
    }, 1000)
  }

  @HostListener('document: click', ['$event'])
  public toggleSuggestBlock(e) {
    if ($(event.target)[0].nodeName != "svg" && e.target.id != this.inputSearch && e.target.className.indexOf(this.markElement) == -1) {
      this.toggleSuggest(false);
    }
  }

  toggleItemValue(valueItem: object, bySuggest: boolean) {
    this.itemSelected = valueItem;
    if ($bean.isNotNil(this.itemSelected) && $bean.isNotNil(this.itemListSelected)) {
      var index = this.getValueIn(valueItem, this.itemListSelected);
      if (index == -1) {
        this.itemListSelected.push(this.itemSelected);
      } else {
        this.itemListSelected.splice(index, 1);
      }
      if ($bean.isNotNil(this.itemListSelected) && this.itemListSelected.length > 0) {
        this.emptyPlaceholder = JCommonUtil.message('common.add', 'common');
      } else {
        this.emptyPlaceholder = JCommonUtil.message('ipm.label.addEmp');
      }
      this.model[this.property] = this.getIdsFormList(this.itemListSelected);
      this.resetDSourceClone();
    }
  }

  resetDSourceClone() {
    this.searchText = '';
    this.inputSearchElement[0].select();
    this.dSourceClone = $bean.clone(this.dSource);
    this.toggleSuggest(true);
  }

  toggleSuggest(status: boolean) {
    var triggerSuggest = status;
    var $this = this;
    if ($bean.isNotEmpty(this.suggestBoxElement)) {
      if (triggerSuggest) {
        this.suggestBoxElement[0].classList.add('active');
        setTimeout(function () {
          $this.suggestBoxElement[0].style.width = '300px';
          $bean.setPostionBound($($this.inputSearchElement[0]), $($this.suggestBoxElement[0]), $($this.elementRef.nativeElement));
        }, 30);
      } else {
        this.suggestBoxElement[0].classList.remove('active');
      }
    }
  }

  changeSearchText() {
    $bean.resetEmpty(this.dSourceClone);
    var len = this.dSource.length;
    for (var i = 0; i < len; i++) {
      if ($bean.isNotNil(this.searchText) && this.dSource[i][this.fieldTitle].toUpperCase().indexOf(this.searchText.toUpperCase()) != -1) {
        this.dSourceClone.push(this.dSource[i]);
      }
    }
  }

  removeItemValue(itemValue) {
    if ($bean.isNotNil(itemValue) && $bean.isNotNil(this.itemListSelected)) {
      var index = this.getValueIn(itemValue, this.itemListSelected);
      if (index != -1) {
        this.itemListSelected.splice(index, 1);
      }
    }
    if ($bean.isNotNil(this.itemListSelected) && this.itemListSelected.length > 0) {
      this.emptyPlaceholder = JCommonUtil.message('common.add', 'common');
    } else {
      this.emptyPlaceholder = JCommonUtil.message('ipm.label.addEmp');
    }
  }

  isItemValueSelected(itemValue) {
    if ($bean.isNotNil(itemValue) && $bean.isNotNil(this.itemListSelected)) {
      var index = this.getValueIn(itemValue, this.itemListSelected);
      if (index != -1) {
        return true;
      }
      return false;
    }
    return false;
  }

  getValueIn(itemValue, list) {
    if ($bean.isNotNil(itemValue) && $bean.isNotNil(list)) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].id == itemValue.id) {
          return i;
        }
      }
    }
    return -1;
  }

  getIdsFormList(list) {
    var ids = [];
    if ($bean.isNotNil(list)) {
      for (var i = 0; i < list.length; i++) {
        ids.push(list[i].id);
      }
    }
    return ids;
  }

  autoSelected() {
    this.itemListSelected = [];
    let dSourceMap = $bean.map(this.dSource, 'id');
    if ($bean.isNotEmpty(this.model[this.property]) && $bean.isNotNil(this.dSource)) {
      for (let empTagId of this.model[this.property]) {
        let empTag = dSourceMap[empTagId];
        if ($bean.isNotEmpty(empTag)) {
          let index = this.getValueIn(empTag, this.itemListSelected);
          if (index == -1) {
            this.itemListSelected.push(empTag);
          }
        }
      }
    }
    this.emptyPlaceholder = JCommonUtil.message('common.add', 'common');
  }

  resetItemSelected() {
    this.itemListSelected = [];
    this.emptyPlaceholder = JCommonUtil.message('ipm.label.addEmp');
  }
}
