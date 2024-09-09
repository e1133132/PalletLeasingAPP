import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {PopoverController} from "ionic-angular";
import {ButtonListPopoverComponent} from "../button-list-popover/button-list-popover";

@Component({
  selector: 'ms-action-panel',
  templateUrl: 'multi-select-action-panel.html',
})
export class MultiSelectActionPanelComponent {

  @ViewChild('msap', {read: ElementRef}) msap;
  @Input('expanded') expanded = false;
  @Input('showMore') showMore = false;
  @Input('buttons') buttons: string[] = [];

  @Output('clickAction') clickEmitter: EventEmitter<string> = new EventEmitter();

  constructor(public popoverCtrl: PopoverController) {
  }

  onMoreActions(myEvent){
    let popover = this.popoverCtrl.create(ButtonListPopoverComponent, {buttons: this.buttons});

    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
      if(data){
        this.clickEmitter.emit(data);
      }
    })
  }

  ngAtterViewInit() {
  }

}
