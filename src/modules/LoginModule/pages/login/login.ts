import {Component, ViewChild} from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavController, NavParams} from '@ionic/angular';
import {ApiURL} from "../../../../shared/ApiURL";
import {LoginProvider} from "../../providers/login/login";
import {HomePage} from "../../../HomeModule/home";
import {tokenKey} from "@angular/core/src/view";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("userNameInput") userNameInput: HTMLInputElement;
  @ViewChild("passWordInput") passWordInput: HTMLInputElement;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private api:ApiURL,
              private loginProvider: LoginProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  tryLogin() {

    let loading = this.loadingCtrl.create({
      content: "Logging in..."
    });

    loading.present();

    this.loginProvider.getToken(this.userNameInput.value.toString(), this.passWordInput.value.toString()).then(data => {
      console.log(data);
      if(data!=null) {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', data);
        localStorage.setItem('userId', data.userNumber);
        localStorage.setItem('userName', data.userName);
        this.api.updateBearerToken();
        console.log("A: "+this.api.httpOptions.toString());
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }
      else {
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: "Log In Unsuccessful",
          message: "The Username or Password may be wrong. Please try again.",
          buttons: [{
            text: "OK",
            role: 'cancel'
          }]
        });
        alert.present();
      }
    });
  }

}
