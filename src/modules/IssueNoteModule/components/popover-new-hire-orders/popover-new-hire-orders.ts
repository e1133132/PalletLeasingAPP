import { Component } from '@angular/core';
import {HireOrderProvider} from "../../../HireOrderModule/providers/hire-order/hire-order";
import {ViewController} from "ionic-angular";

/**
 * Generated class for the PopoverNewHireOrdersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover-new-hire-orders',
  templateUrl: 'popover-new-hire-orders.html'
})
export class PopoverNewHireOrdersComponent {

  newHireOrders;

  constructor(private hireOrderProvider: HireOrderProvider,
              private viewCtrl: ViewController) {
    console.log('Hello PopoverNewHireOrdersComponent Component');

    this.hireOrderProvider.getReleasedAndPartiallyCompleteHireOrders().then(data=> {
      this.newHireOrders=data;
    });
  }

  sendHireOrderAndClose(hireOrder) {
    if(hireOrder) {
      this.viewCtrl.dismiss(hireOrder);
    }
    else {
      this.viewCtrl.dismiss();
    }
  }

}
