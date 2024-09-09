import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { RetrieveNoteHomePage } from './retrieve-note-home';
import {ComponentsModule} from "../../../../shared/components/components.module";

@NgModule({
  declarations: [
    RetrieveNoteHomePage,
  ],
  imports: [
    IonicPageModule.forChild(RetrieveNoteHomePage),
    ComponentsModule
  ],
})
export class RetrieveNoteHomePageModule {}
