import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { LoginMgmtPage } from './login-mgmt';

@NgModule({
  declarations: [
    LoginMgmtPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginMgmtPage),
  ],
})
export class LoginMgmtPageModule {}
