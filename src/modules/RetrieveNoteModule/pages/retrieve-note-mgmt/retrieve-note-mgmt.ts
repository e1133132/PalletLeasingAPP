import { Component, ViewChild, OnInit } from '@angular/core';
import {
  AlertController,
  NavController,
  Platform,
  PopoverController
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RetrieveNoteProvider } from "../../providers/retrieve-note/retrieve-note";
import { HireOrderCreateSelectCustomerPopoverComponent } from "../../../HireOrderModule/components/hire-order-create-select-customer-popover/hire-order-create-select-customer-popover";
import { CustomerProvider } from "../../../CustomerModule/providers/customer/customer";
import { PalletProfileProvider } from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";

@Component({
  selector: 'page-retrieve-note-mgmt',
  templateUrl: 'retrieve-note-mgmt.html',
})
export class RetrieveNoteMgmtPage implements OnInit {

  retrieveNote: any;
  editRetrieveNoteForm: FormGroup;
  allCustomers: any[];
  allPalletProfiles: any[];
  @ViewChild("customerName") customerName: HTMLInputElement;

  paginationDataRN = {
    showPagination: false,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 1000
  };

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private platform: Platform,
    private retrieveNoteProvider: RetrieveNoteProvider,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private customerProvider: CustomerProvider,
    private palletProvider: PalletProfileProvider
  ) {
    this.editRetrieveNoteForm = this.formBuilder.group({
      Retrieve_Note_ID: [''],
      Retrieve_Note_No: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Customer_ID: ['', Validators.compose([Validators.maxLength(255)])],
      Pallet_Profile_ID: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Qty: ['', Validators.compose([Validators.maxLength(255), Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])],
      Retrieve_Date: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Status: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Retrieve_Type: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Retrieve_Address: ['', Validators.compose([Validators.maxLength(255)])],
      Vehicle_No: ['', Validators.compose([Validators.maxLength(255)])],
      Driver: ['', Validators.compose([Validators.maxLength(255)])],
      Driver_IC: ['', Validators.compose([Validators.maxLength(255)])],
      Tpn_Company: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Dehire_Charge: ['', Validators.compose([Validators.maxLength(255), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Tpn_Charge: ['', Validators.compose([Validators.maxLength(255), Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)])],
      Remarks: ['', Validators.compose([Validators.maxLength(255)])]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.retrieveNote) {
        this.retrieveNote = JSON.parse(params.retrieveNote);
        this.displayRetrieveNote();
      }
    });

    Promise.all([this.customerProvider.getAllCustomers(), this.palletProvider.getAllPalletProfiles()])
      .then(values => {
        this.allCustomers = values[0];
        this.allPalletProfiles = values[1];
      });
  }

  displayRetrieveNote() {
    if (this.retrieveNote) {
      Object.keys(this.editRetrieveNoteForm.controls).forEach(key => {
        this.editRetrieveNoteForm.controls[key].setValue(this.retrieveNote[key]);
      });
      if (this.customerName) {
        this.customerName.value = this.retrieveNote.Customer_Name;
      }
    }
  }

  async openCustomerNamePopOver(event) {
    const popover = await this.popoverController.create({
      component: HireOrderCreateSelectCustomerPopoverComponent,
      componentProps: { customers: this.allCustomers },
      cssClass: 'custom-customer-popover',
      event: event
    });

    await popover.present();
    const { data } = await popover.onDidDismiss();
    if (data) {
      this.editRetrieveNoteForm.controls["Customer_ID"].setValue(data.customer_ID);
      if (this.customerName) {
        this.customerName.value = data.Customer_Name;
      }
      this.editRetrieveNoteForm.controls["Retrieve_Address"].setValue(data.Retrieve_Address);
    }
  }

  undoForm() {
    this.displayRetrieveNote();
  }

  async editRetrieveNote(formData) {
    const confirmAlert = await this.alertController.create({
      header: "Confirm Changes?",
      message: "Would you like to save the change(s)? The change(s) cannot be undone.",
      buttons: [
        {
          text: "Yes",
          handler: async () => {
            try {
              const result = await this.retrieveNoteProvider.patchEditRetrieveNote(formData);
              if (result) {
                const successAlert = await this.alertController.create({
                  header: "Success",
                  message: "Changes successfully saved.",
                  buttons: ["OK"]
                });
                await successAlert.present();
              } else {
                throw new Error("Failed to save changes");
              }
            } catch (error) {
              const failureAlert = await this.alertController.create({
                header: "Failed",
                message: "Changes failed to save. Please try again. If this continues, please contact your system administrator",
                buttons: ["OK"]
              });
              await failureAlert.present();
            }
          }
        },
        {
          text: "No",
          role: "cancel"
        }
      ]
    });
    await confirmAlert.present();
  }
}
