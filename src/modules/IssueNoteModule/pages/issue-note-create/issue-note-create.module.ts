import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic/angular';
import { IssueNoteCreatePage } from './issue-note-create';

@NgModule({
  declarations: [
    IssueNoteCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(IssueNoteCreatePage),
  ],
})
export class IssueNoteCreatePageModule {}
