import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { RetrieveNoteMgmtPage } from './retrieve-note-mgmt';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    RetrieveNoteMgmtPage,
  ],
  imports: [
    IonicPageModule.forChild(RetrieveNoteMgmtPage),
    ComponentsModule
  ],
})
export class RetrieveNoteMgmtPageModule {}
