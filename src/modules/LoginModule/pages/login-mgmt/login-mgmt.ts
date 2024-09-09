import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from '@ionic/angular';

/**
 * Generated class for the LoginMgmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-mgmt',
  templateUrl: 'login-mgmt.html',
})
export class LoginMgmtPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginMgmtPage');
  }

}
