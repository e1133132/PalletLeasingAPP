import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FilterData, PaginationData} from "../../template-models/template-models";
import {Platform, PopoverController} from "ionic-angular";
import {TableFilterPopoverComponent} from "../table-filter-popover/table-filter-popover";

@Component({
  selector: 'expandable-responsive-card',
  templateUrl: 'expandable-responsive-card.html'
})
export class ExpandableResponsiveCardComponent {

  @Input('initialExpand') expanded: boolean = true;
  @Input('expandHeight') expandHeight = 500;
  @Input('expandTime') expandTime = 0.375;

  @Input('filterData') filterData: FilterData = null;
  @Input('paginationData') paginationData: PaginationData;

  @Output('changeFilter') changeFilter: EventEmitter<string> = new EventEmitter();
  @Output('changePagination') changePagination: EventEmitter<any> = new EventEmitter();


  //these view children are to make sure old ng-content works
  @ViewChild('tableHeaders') tableHeadersContent: ElementRef;
  showTableHeadersContent: boolean = true;

  @ViewChild('secondaryData') secondaryDataContent: ElementRef;
  @ViewChild('secondaryActions') secondaryActionsContent: ElementRef;
  showSecondaries: boolean = true;

  @ViewChild('tableData') tableDataContent: ElementRef;
  showTableDataContent: boolean = true;

  constructor(private popoverCtrl: PopoverController, public platform: Platform) {
  }

  ngAfterViewInit(){
    //these are to make sure old way of inputting ng-content works
    this.showTableHeadersContent = this.tableHeadersContent.nativeElement.children.length > 0;
    this.showSecondaries = this.secondaryDataContent.nativeElement.children.length > 0 || this.secondaryActionsContent.nativeElement.children.length > 0;
    this.showTableDataContent = this.tableDataContent.nativeElement.children.length > 0;
  }

  onExpand(){
    this.expanded = !this.expanded;
  }

  onViewFilters(myEvent){
    let popover = this.popoverCtrl.create(TableFilterPopoverComponent, {filterData: this.filterData} );
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if(data){
        this.changeFilter.emit(data);
      }
    });
  }

  onChangePagination(myEvent){
    this.changePagination.emit(myEvent);
  }

}
