import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from '@ionic/angular';
import {IssueNoteProvider} from "../../providers/issue-note/issue-note";
import {HireOrderProvider} from "../../../HireOrderModule/providers/hire-order/hire-order";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverNewHireOrdersComponent} from "../../components/popover-new-hire-orders/popover-new-hire-orders";
import {RateChargeProvider} from "../../../../providers/rate-charge/rate-charge";

/**
 * Generated class for the IssueNoteCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-issue-note-create',
  templateUrl: 'issue-note-create.html',
})
export class IssueNoteCreatePage {

  createIssueOrderForm: FormGroup;
  chosenHireOrder;
  currentDate:string = new Date().toISOString();
  hireOrderDate:string;
  lastIssueNoteOfHireOrder;
  latestIssueNoteNumber;
  ratechargeofCustomerNPallet;
  @ViewChild("customerName") customerName: HTMLInputElement;
  @ViewChild("qtyPending") qtyPending: HTMLInputElement;
  @ViewChild("palletType") palletType: HTMLInputElement;
  @ViewChild("delivery_Type") delivery_Type: HTMLInputElement;
  @ViewChild("hireOrderIDInput") hireOrderIDInput: HTMLInputElement;
  @ViewChild("hireOrderNoInput") hireOrderNoInput: HTMLInputElement;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private issueNoteProvider: IssueNoteProvider,
              private hireOrderProvider: HireOrderProvider,
              private rateChargeProvider: RateChargeProvider,
              private popOverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder) {

    this.createIssueOrderForm = this.formBuilder.group({
      Issue_Note_No:['', Validators.compose([Validators.maxLength(255)])],
      Hire_Order_ID: ['', Validators.compose([Validators.required])],
      Issue_Qty: ['', Validators.compose([Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])], //only numbers
      Issue_Date: ['', Validators.compose([Validators.required])],
      Status:['',Validators.compose([Validators.maxLength(255),Validators.required])],
      Vehicle_No: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      Driver: ['', Validators.compose([Validators.maxLength(255), Validators.required])],
      Driver_IC: ['', Validators.compose([Validators.required])],
      Tpn_Company: ['',Validators.required],
      Tpn_Charge: ['', Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
      Heat_treatment: ['',Validators.required],
      Remarks: [''],
      Issue_Type: ['', Validators.required],
      Qty_Rejected: ['']
    });

    Promise.all([this.issueNoteProvider.getLastIssueNoteNo()]).then(values=>{
      this.latestIssueNoteNumber = this.getLatestIssueNoteNo(values[0]);
      this.createIssueOrderForm.controls["Issue_Note_No"].setValue(this.latestIssueNoteNumber);
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IssueNoteCreatePage');
  }

  createIssueNote(formData) {

                if (this.createIssueOrderForm.controls["Issue_Qty"].value > this.qtyPending.value) {
                let alert = this.alertCtrl.create({
                  title: "Quantity Error",
                  message: "Issue Quantity is higher than Remaining Quantity in Hire Order. Please try again with a smaller quantity.",
                  buttons: [{
                    text: 'OK',
                    role: 'cancel',
                    handler: () => {
                    }
                  }]
                });
                alert.present();
              }
              else {
                  this.issueNoteProvider.postNewIssueNote(formData).then(result => {
                    console.log(result);
                  });
                  let successAlert = this.alertCtrl.create({
                    title: "Success!",
                    message: "Issue Note successfully created!",
                    buttons: [{
                      text: 'Ok',
                      role: 'cancel',
                      handler: () => {
                        this.navCtrl.pop();
                      }
                    }]
                  });
                  successAlert.present();

                // if ((this.createIssueOrderForm.controls["Issue_Qty"].value - parseInt(this.qtyPending.value)) == 0) {
                //   let alert = this.alertCtrl.create({
                //     title: "Completion of Hire Order",
                //     message: "Hire Order will be completed after this Issue Note. Would you like to mark the attached Hire Order as Completed?",
                //     buttons: [{
                //       text: 'Yes',
                //       role: 'cancel',
                //       handler: () => {
                //         console.log(this.chosenHireOrder.Hire_Order_ID);
                //         this.hireOrderProvider.markHireOrderAsComplete(this.chosenHireOrder.Hire_Order_ID).then(result => {
                //           console.log(result);
                //         });
                //         this.issueNoteProvider.postNewIssueNote(formData).then(result => {
                //         console.log(result);
                //         });
                //         let successAlert = this.alertCtrl.create({
                //           title: "Success!",
                //           message: "Issue Note successfully created!",
                //           buttons: [{
                //             text: 'Yes',
                //             role: 'cancel',
                //             handler: () => {
                //             this.navCtrl.pop();
                //             }
                //           }]
                //         });
                //         successAlert.present();
                //       }
                //     },
                //     {
                //       text: 'No',
                //       role: 'cancel',
                //       handler: () => {
                //         this.issueNoteProvider.postNewIssueNote(formData).then(result => {
                //         console.log(result);
                //         });
                //         let successAlert = this.alertCtrl.create({
                //           title: "Success!",
                //           message: "Issue Note successfully created!",
                //           buttons: [{
                //             text: 'Yes',
                //             role: 'cancel',
                //             handler: () => {
                //             this.navCtrl.pop();
                //             }
                //           }]
                //         });
                //         successAlert.present();
                //       }
                //     }]
                //   });
                //   alert.present();
                // }
                // else if(this.createIssueOrderForm.controls["Issue_Qty"].value < this.qtyPending.value) {
                //   this.issueNoteProvider.postNewIssueNote(formData).then(result => {
                //     console.log(result);
                //   });
                //   this.hireOrderProvider.markHireOrderAsPartiallyComplete(this.chosenHireOrder.Hire_Order_ID).then(result =>{
                //     console.log("Partially Complete "+result);
                //   });
                //   let successAlert = this.alertCtrl.create({
                //     title: "Success!",
                //     message: "Issue Note successfully created!",
                //     buttons: [{
                //       text: 'Yes',
                //       role: 'cancel',
                //       handler: () => {
                //         this.navCtrl.pop();
                //       }
                //     }]
                //   });
                //   successAlert.present();
                //
                // }
              }
  }

  openIssueNoteSelectHireOrderPopOver(event) {
    let popover = this.popOverCtrl.create(PopoverNewHireOrdersComponent, {cssClass:'custom-customer-popover'});

    popover.onDidDismiss(data => {
    if(data) {
      this.chosenHireOrder=data;
      this.customerName.value=this.chosenHireOrder.Customer_Name;
      this.palletType.value = this.chosenHireOrder.Pallet_Type;
      this.delivery_Type.value = this.chosenHireOrder.Delivery_Type;
      this.hireOrderIDInput.value = this.chosenHireOrder.Hire_Order_ID;
      this.hireOrderNoInput.value = this.chosenHireOrder.Hire_Order_No;
      this.hireOrderDate = this.chosenHireOrder.Hire_Date;
      this.createIssueOrderForm.controls["Issue_Date"].setValue(this.hireOrderDate);
      this.createIssueOrderForm.controls["Issue_Type"].setValue("Deliver by LHP");
      this.createIssueOrderForm.controls["Qty_Rejected"].setValue(0);
      this.createIssueOrderForm.controls["Status"].setValue("New");

      this.issueNoteProvider.getQtyPendingForHireOrder(this.chosenHireOrder.Hire_Order_ID).then (result=> {
        console.log(result);
        if(result) {
          this.qtyPending.value = result;

        }
      });

      let alert = this.alertCtrl.create({
        title: 'Loading Last Issue Note',
        message: 'Do you want to load the details of the last issue note for ' + this.chosenHireOrder.Hire_Order_No+ '?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              this.rateChargeProvider.getChargeRateOfCustomerIdPalletId(this.chosenHireOrder.Customer_ID,
                this.chosenHireOrder.Pallet_Profile_ID).then(result=>{
                this.ratechargeofCustomerNPallet= result;
                this.createIssueOrderForm.controls["Tpn_Charge"].setValue(this.ratechargeofCustomerNPallet.Tpn_Charge);
              });

            }
          },
          {
            text:'Yes',
            handler: () => {
              this.issueNoteProvider.getLastIssueNoteOfHireOrder(this.chosenHireOrder.Hire_Order_ID).then(result=> {
                if(result!=null)
                {
                  this.lastIssueNoteOfHireOrder = result;
                  this.createIssueOrderForm.controls["Issue_Qty"].setValue(this.lastIssueNoteOfHireOrder.Issue_Qty);
                  this.createIssueOrderForm.controls["Vehicle_No"].setValue(this.lastIssueNoteOfHireOrder.Vehicle_No);
                  this.createIssueOrderForm.controls["Driver"].setValue(this.lastIssueNoteOfHireOrder.Driver);
                  this.createIssueOrderForm.controls["Driver_IC"].setValue(this.lastIssueNoteOfHireOrder.Driver_IC);
                  this.createIssueOrderForm.controls["Tpn_Company"].setValue(this.lastIssueNoteOfHireOrder.Tpn_Company);
                  this.createIssueOrderForm.controls["Tpn_Charge"].setValue(this.lastIssueNoteOfHireOrder.Tpn_Charge);
                  this.createIssueOrderForm.controls["Heat_treatment"].setValue(this.lastIssueNoteOfHireOrder.Heat_treatment);
                  this.createIssueOrderForm.controls["Remarks"].setValue(this.lastIssueNoteOfHireOrder.Remarks);
                }
                else
                {
                  let noIssueNoteAlert = this.alertCtrl.create({
                    title: 'No Issue Note Found',
                    message: 'There are no issue notes for this hire order yet.',
                    buttons: [{
                      text:'Ok',
                      role:'cancel',
                      handler:()=>{}
                    }]
                  });
                  noIssueNoteAlert.present();
                }
              });
            }
          }
        ]});
      alert.present();

    }
    });

    let eventTest = {
      target : {
        getBoundingClientRect : () => {
          return {
            top: '100'
          };
        }
      }
    };

    popover.present({
      ev:eventTest
    });

  }

  getLatestIssueNoteNo(lastNo:string):string {
    let start = lastNo.substr(0,3);
    let dash = lastNo.substr(5,1);
    let number = lastNo.substr(6,lastNo.length);

    let intNumber = parseInt(number);
    intNumber++;
    let stringNumber = intNumber.toLocaleString('en',{minimumIntegerDigits:5, useGrouping:false});


    let yearNow:string = new Date().getFullYear().toString();
    let yearShort:string = yearNow.substr(2,2);

    return start+yearShort+dash+stringNumber;

  }


  resetForm() {
    this.createIssueOrderForm.reset();
    Promise.all([this.issueNoteProvider.getLastIssueNoteNo()]).then(values=>{
      this.latestIssueNoteNumber = this.getLatestIssueNoteNo(values[0]);
      this.createIssueOrderForm.controls["Issue_Note_No"].setValue(this.latestIssueNoteNumber);
    });
  }

}
