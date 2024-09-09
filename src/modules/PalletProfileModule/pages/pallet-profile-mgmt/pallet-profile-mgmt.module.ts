import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { PalletProfileMgmtPage } from './pallet-profile-mgmt';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    PalletProfileMgmtPage,
  ],
  imports: [
    IonicPageModule.forChild(PalletProfileMgmtPage),
    ComponentsModule
  ],
})
export class PalletProfileMgmtPageModule {}
