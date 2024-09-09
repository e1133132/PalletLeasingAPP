import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {PopoverController} from "ionic-angular";
import {SearchableDropdownPopoverComponent} from "../searchable-dropdown-popover/searchable-dropdown-popover";

@Component({
  selector: 'searchable-dropdown',
  templateUrl: 'searchable-dropdown.html'
})
export class SearchableDropdownComponent {

  @Input('value') value = '';
  @Input('url') url?: string = null;
  @Output() valueEmit: EventEmitter<string> = new EventEmitter();

  constructor(private popoverCtrl: PopoverController ) {
  }

  @HostListener('click', ['$event']) onClick(myEvent) {
    let popover = this.popoverCtrl.create(SearchableDropdownPopoverComponent, {'url': this.url, 'value': this.value});

    popover.present({ev: myEvent});

    popover.onDidDismiss(data => {
      if(data){
        console.log(data);
        this.value = data;
        this.valueEmit.emit(this.value);
      }
    });
  }
}
