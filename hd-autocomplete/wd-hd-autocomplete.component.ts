/**
 * Created by ihcmtest01_vdi on 10/31/2018.
 */
import {
  OnChanges,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  Type,
  ViewChild,
  SimpleChanges
} from '@angular/core';

import {AutoCompleteItemComponent} from "./wd-hd-autocomplete-item.component";
import {HdModalService} from "../hd-modal/hd-modal.service";
import {EmployeeAdvanceSearchComponent} from "../../../app/modules/employee-advance-search/employee-advance-search.component";

declare var $bean;
declare var $;

@Component({
  selector: 'hd-autocomplete',
  templateUrl: './wd-hd-autocomplete.component.html'
})
export class AutoCompleteComponent implements OnInit, OnChanges {
  @Input() model: any;
  @Input() property: string;
  @Input() searchText: string;
  @Input() clearSearch: boolean;
  @Input() advanceSearchConfig: boolean;
  @Input() dSource ?: any;
  @Input() fieldValue: string;
  @Input() fieldTitle: string;
  @Input() fieldTip: string;
  @Input() disabled: boolean;
  @Input() emptyPlaceholder: string;
  @Input() hydname: string;
  @Input() dSourceClone ?: any;
  @Input() iconPrepend ?: string;
  @Input() emptyValue: any;
  @Input() component: Type<any>;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  public fullPathPhoto: string;
  public inputId: any;
  public itemSelected: any;
  public hasEmptyValue: any;
  public indexFocus: number;
  public triggerSuggest: boolean;
  public resetValue: Function;
  @ViewChild('inputData') inputData: ElementRef;
  @ViewChild('suggestBlock') suggestBlock: ElementRef;

  constructor(private elementRef: ElementRef,
              private render: Renderer2,
              private componentFactoryResolver: ComponentFactoryResolver,
              private modalService: HdModalService) {
  }

  ngOnInit() {
    if ($bean.isNil(this.component)) {
      this.component = AutoCompleteItemComponent;
    }
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
    if ($bean.isNil(this.fieldTip)) {
      this.fieldTip = 'tip';
    }
    if ($bean.isNil(this.iconPrepend)) {
      this.iconPrepend = this.iconPrepend || 'fas fa-search';
    }
    if ($bean.isNil(this.advanceSearchConfig)) {
      this.advanceSearchConfig = false;
    }
    if ($bean.isNil(this.clearSearch)) {
      this.clearSearch = false;
    }
    this.fullPathPhoto = "fullPathPhoto";
    this.indexFocus = -1;
    this.inputId = $bean.genRandomID(20);
    this.resetValue = function () {
      this.searchText = "";
      this.model[this.property] = null;
    }
  }

  ngOnChanges(changes: any) {
    this.dSourceClone = $bean.clone(this.dSource);
    if ($bean.isNotEmpty(this.model) && $bean.isNotEmpty(this.property) && $bean.isNotEmpty(this.model[this.property]) && $bean.isNotEmpty(this.dSourceClone)) {
      let foundValue = false;
      for (var i = 0; i < this.dSourceClone.length; i++) {
        if (this.dSourceClone[i][this.fieldValue] == this.model[this.property]) {
          this.searchText = this.dSourceClone[i][this.fieldTitle];
          foundValue = true;
          break;
        }
      }
      if (!foundValue) {
        this.searchText = '';
      }
    } else {
      this.searchText = "";
    }
  }

  @HostListener('document: click', ['$event'])
  public toggleSuggestBlock(e) {
    if (e.target.id != this.inputId && this.suggestBlock.nativeElement.classList.contains('active')) {
      this.getValue()
      this.toggleSuggest(false);
    }
  }

  chooseItemValue(valueItem: object, bySuggest: boolean) {
    this.itemSelected = valueItem;
    if (this.clearSearch) {
      this.searchText = "";
    } else {
      this.searchText = this.itemSelected[this.fieldTitle];
    }
    if ($bean.isNotNil(this.model) && $bean.isNotNil(this.property)) {
      this.model[this.property] = this.itemSelected[this.fieldValue];
    }
    if (this.onChange.observers.length > 0) {
      this.onChange.emit(this.itemSelected);
    }
    if (bySuggest) {
      this.toggleSuggest(false);
    }
  }

  resetDSourceClone() {
    this.inputData.nativeElement.select();
    this.dSourceClone = $bean.clone(this.dSource);
  }

  changeSearchText() {
    if ($bean.isNotEmpty(this.model[this.property])) {
      this.model[this.property] = "";
    }
    $bean.resetEmpty(this.dSourceClone);
    var len = this.dSource.length;
    for (var i = 0; i < len; i++) {
      if ($bean.textContains(this.dSource[i][this.fieldTitle], this.searchText, true)) {
        this.dSourceClone.push(this.dSource[i]);
      }
    }
  }

  toggleSuggest(status: boolean) {
    var triggerSuggest = status;
    if (triggerSuggest) {
      this.render.addClass(this.suggestBlock.nativeElement, 'active');
    } else {
      this.render.removeClass(this.suggestBlock.nativeElement, 'active');
    }
  }

  onKeyup(e) {
    if ((e.keyCode != $bean.KEY_CODE_UP) && (e.keyCode != $bean.KEY_CODE_DOWN) && (e.keyCode != $bean.KEY_CODE_ENTER)) {
      this.changeSearchText();
    }
  }

  onKeydown(e) {
    if ((e.keyCode == $bean.KEY_CODE_TAB) || (e.keyCode == $bean.KEY_CODE_ESC)) {
      this.toggleSuggest(false);
    } else if (e.keyCode == $bean.KEY_CODE_UP) {
      if ($bean.isEmpty(this.dSourceClone)) {
        return;
      }
      this.indexFocus--;
      if (this.indexFocus < 0) {
        this.indexFocus = this.dSourceClone.length - 1;
      }
      var item = this.dSourceClone[this.indexFocus];
      if (item) {
        this.searchText = item[this.fieldTitle];
      }
      $bean.scrollToElem($(this.suggestBlock.nativeElement.children[this.indexFocus]), $(this.suggestBlock.nativeElement));
    } else if (e.keyCode == $bean.KEY_CODE_DOWN) {
      if ($bean.isEmpty(this.dSourceClone)) {
        return;
      }
      this.indexFocus++;
      if (this.indexFocus == this.dSourceClone.length) {
        this.indexFocus = 0;
      }
      var item = this.dSourceClone[this.indexFocus];
      if (item) {
        this.searchText = item[this.fieldTitle];
      }
      $bean.scrollToElem($(this.suggestBlock.nativeElement.children[this.indexFocus]), $(this.suggestBlock.nativeElement));
    } else if (e.keyCode == $bean.KEY_CODE_ENTER) {
      e.stopPropagation();
      e.preventDefault();
      this.itemSelected = {};
      this.itemSelected[this.fieldTitle] = this.searchText;
      this.itemSelected = $bean.getObjFromCollection(this.dSource, this.itemSelected);
      if ($bean.isNotNil(this.itemSelected)) {
        this.indexFocus = -1;
        this.chooseItemValue(this.itemSelected, true);
      }
    }
  }

  onBlur(e) {
    this.toggleSuggest(false);
  }

  onFocus() {
    if (this.searchText) {
      this.resetDSourceClone();
    }
    this.toggleSuggest(true);
  }

  showAdvance(advanceSearchConfig, $event) {
    this.modalService.showModal(EmployeeAdvanceSearchComponent, {
        advanceSearchParams: advanceSearchConfig
      }
    );
  }

  getValue() {
    this.itemSelected = {};
    this.itemSelected[this.fieldTitle] = this.searchText;
    this.itemSelected = $bean.getObjFromCollection(this.dSource, this.itemSelected);
    if ($bean.isNotNil(this.itemSelected)) {
      this.indexFocus = -1;
      this.model[this.property] = this.itemSelected[this.fieldValue];
    } else {
      this.searchText = "";
    }
    if (this.onChange.observers.length > 0) {
      this.onChange.emit(this.itemSelected);
    }
  }

}
