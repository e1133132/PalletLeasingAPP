import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';


import { HomePage } from '../modules/HomeModule/home';
import { CustomerHomePage } from "../modules/CustomerModule/pages/customer-home/customer-home";
import { HireOrderHomePage } from "../modules/HireOrderModule/pages/hire-order-home/hire-order-home";
import { IssueNoteHomePage } from "../modules/IssueNoteModule/pages/issue-note-home/issue-note-home";
import { RetrieveNoteHomePage } from "../modules/RetrieveNoteModule/pages/retrieve-note-home/retrieve-note-home";
import { SettingsProvider } from "../providers/settings/settings";
import { PalletProfileHomePage } from "../modules/PalletProfileModule/pages/pallet-profile-home/pallet-profile-home";
import { LoginPage } from "../modules/LoginModule/pages/login/login";
import { ApiURL } from "../shared/ApiURL";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // 移除了 Nav，改用 NavController
  rootPage: any;
  pages: Array<{title: string, component: any}>;
  selectedTheme: String;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,  // 添加 typeof
    public splashScreen: SplashScreen,  // 添加 typeof
    private settings: SettingsProvider,
    private api: ApiURL,
    private navCtrl: NavController  // 添加 NavController
  ) {
    this.initializeApp();

    //navigation purposes
    this.pages = [
      { title: 'Customers', component: CustomerHomePage },
      { title: 'Hire Orders', component: HireOrderHomePage },
      { title: 'Issue Notes', component: IssueNoteHomePage },
      { title: 'Retrieve Notes', component: RetrieveNoteHomePage },
      { title: 'Pallet Profile', component: PalletProfileHomePage },
      { title: 'Logout(Testing)', component: PalletProfileHomePage }
    ];

    //theming according to country DB
    this.settings.getActiveTheme().subscribe(val => {
      this.selectedTheme = val;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (localStorage.getItem('token')) {
        this.api.updateBearerToken();
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  openPage(page) {
    this.navCtrl.navigateRoot(page.component);
  }

  restart() {
    document.location.href = "/";
  }
}
