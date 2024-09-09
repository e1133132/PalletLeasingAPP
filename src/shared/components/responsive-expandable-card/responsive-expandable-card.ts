import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CardOptions, FilterData, OrderedColData, PaginationData, RECard} from "../../template-models/template-models";
import {TableFilterPopoverComponent} from "../table-filter-popover/table-filter-popover";
import {PopoverController} from "ionic-angular";


@Component({
  selector: 'responsive-expandable-card',
  templateUrl: 'responsive-expandable-card.html'
})
export class ResponsiveExpandableCardComponent implements OnInit{

  @Input('RECard') card: RECard = { expended: false};

  filterData: FilterData = null;
  paginationData: PaginationData;

  tableOrderedCol: OrderedColData = {
    id: '', name: '', isDescending: true
  };


  @Output('changeFilter') changeFilter: EventEmitter<string> = new EventEmitter();
  @Output('changePagination') changePagination: EventEmitter<any> = new EventEmitter();


  @ViewChild('secondaryActions') secondaryActionsContent: ElementRef;
  showSecondaries: boolean = true;

  constructor(private popoverCtrl: PopoverController) {

  }

  ngOnInit(){
    if(this.card.table){
      if(this.card.table.orderedAttribute){
        this.tableOrderedCol = {
          id: this.card.table.orderedAttribute.primary,
          name: this.card.table.displayableAttributes.find(x => x.name == this.card.table.orderedAttribute.primary).displayName,
          isDescending: true
        }
      } else {
        this.tableOrderedCol = {
          id: this.card.table.displayableAttributes[0].name,
          name: this.card.table.displayableAttributes[0].displayName,
          isDescending: true
        }
      }

      if(this.card.table.displayCheckboxes == null){
        this.card.table.displayCheckboxes = true;
      }
    }

    console.log(this.card);
  }

  onExpand(){
    console.log(this.card.expended);
    this.card.expended = !this.card.expended;
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

  get displayColumns(){
    let numOfColumns = 12;
    if(this.card.table.displayCheckboxes == null || this.card.table.displayCheckboxes == true){
      numOfColumns = 11;
    }
    let columns: any[] = [];
    for(let item of this.card.table.displayableAttributes){
      if(!item.hide){
        columns.push(item);
      }
    }

    return columns.slice(0, numOfColumns-1);
  }

}
