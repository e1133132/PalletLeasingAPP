import { Component } from '@angular/core';
import {AlertController, NavParams, ViewController} from "@ionic/angular";
import {PalletProfileProvider} from "../../providers/pallet-profile/pallet-profile";

/**
 * Generated class for the PalletProfileContextMenuHomeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pallet-profile-context-menu-home',
  templateUrl: 'pallet-profile-context-menu-home.html'
})
export class PalletProfileContextMenuHomeComponent {

  palletProfile;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private palletProfileProvider: PalletProfileProvider,
              private alertCtrl: AlertController,) {
    console.log('Hello PalletProfileContextMenuHomeComponent Component');

      this.palletProfile = this.navParams.get("palletProfile");
  }

  deletePalletProfile() {

    let alert = this.alertCtrl.create({
      title: "Confirmation of Removal",
      message: "Are you sure? This action cannot be undone.",
      buttons: [{
        text: "Yes",
        role: "cancel",
        handler: ()=> {
          this.palletProfileProvider.deletePalletProfile(this.palletProfile.Pallet_Profile_ID).then(result=> {

          });
          let successAlert = this.alertCtrl.create({
            title: "Success!",
            message: "Pallet Profile has been removed.",
            buttons: [{text: "OK", role:"cancel", handler: ()=>{ this.viewCtrl.dismiss();}}]
          });
          successAlert.present();
        }
      },{
        text:"No",
        role: "cancel",
        handler: ()=>{}
      }]
    });
    alert.present();
  }

  replenishStock() {
    let getAmtAlert = this.alertCtrl.create({
      title: "Add Stock",
      message: "Please indicate number of stock to add to "+this.palletProfile.Pallet_Type+".",
      inputs:[{
        name: "input",
        placeholder: "Number",
        type: "number"
      }],
      buttons: [{
        text: "OK",
        role: "cancel",
        handler: (data => {

          this.palletProfileProvider.addToStock(this.palletProfile.Pallet_Profile_ID,data.input).then(result =>{
            let successAlert = this.alertCtrl.create({
              title: "Success",
              message: "Stock has been added. The current stock is now "+result,
              buttons: [{
                text: "OK",
                role: "cancel",
                handler: () => {
                  this.viewCtrl.dismiss();
                }
              }]
            });
            successAlert.present();
          });


        })
      }, {
        text:"Cancel",
        role: "cancel",
        handler: ()=> {}
      }]
    });
    getAmtAlert.present();
  }

}
