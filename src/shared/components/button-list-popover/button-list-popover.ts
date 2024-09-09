import { Component } from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";

@Component({
  selector: 'button-list-popover',
  templateUrl: 'button-list-popover.html'
})
export class ButtonListPopoverComponent {

  buttons: string[] = [];

  constructor(public navParams: NavParams,public viewCtrl: ViewController) {
    this.buttons = navParams.get('buttons');
  }

  onClickButton(value){
    this.viewCtrl.dismiss(value);
  }

}
