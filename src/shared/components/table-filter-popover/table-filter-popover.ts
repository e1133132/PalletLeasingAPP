import {Component, Input} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FilterData} from "../../template-models/template-models";

@Component({
  selector: 'table-filter-popover',
  templateUrl: 'table-filter-popover.html'
})
export class TableFilterPopoverComponent {

  private filterData: FilterData;

  constructor(private viewCtrl: ViewController, navParams: NavParams) {
    this.filterData = navParams.get('filterData');
  }

  onChangeFilters(){
    this.viewCtrl.dismiss(this.filterData);
  }

}
