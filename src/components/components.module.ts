import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // 如果是 Ionic 项目
import { IssueNoteContextMenuHomeComponent } from '../modules/IssueNoteModule/components/issue-note-context-menu-home/issue-note-context-menu-home';
import { RetrieveNoteContextMenuHomeComponent } from '../modules/RetrieveNoteModule/components/retrieve-note-context-menu-home/retrieve-note-context-menu-home';
import { RetrieveNoteCreateCustomerSelectPopoverComponent } from '../modules/RetrieveNoteModule/components/retrieve-note-create-customer-select-popover/retrieve-note-create-customer-select-popover';
import { RetrieveNoteModalSummaryReportComponent } from '../modules/RetrieveNoteModule/components/retrieve-note-modal-summary-report/retrieve-note-modal-summary-report';
import { PalletProfileContextMenuHomeComponent } from '../modules/PalletProfileModule/components/pallet-profile-context-menu-home/pallet-profile-context-menu-home';

@NgModule({
  declarations: [
    IssueNoteContextMenuHomeComponent,
    RetrieveNoteContextMenuHomeComponent,
    RetrieveNoteCreateCustomerSelectPopoverComponent,
    RetrieveNoteModalSummaryReportComponent,
    PalletProfileContextMenuHomeComponent
  ],
  imports: [
    CommonModule,
    IonicModule  // 如果是 Ionic 项目
  ],
  exports: [
    IssueNoteContextMenuHomeComponent,
    RetrieveNoteContextMenuHomeComponent,
    RetrieveNoteCreateCustomerSelectPopoverComponent,
    RetrieveNoteModalSummaryReportComponent,
    PalletProfileContextMenuHomeComponent
  ]
})
export class ComponentsModule {}
