import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams, Platform, PopoverController} from '@ionic/angular';
import {CustomerProvider} from "../../../CustomerModule/providers/customer/customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HireOrderProvider} from "../../providers/hire-order/hire-order";
import {AdvanceOrderProvider} from "../../../../providers/advance-order/advance-order";
import {PalletProfileProvider} from "../../../PalletProfileModule/providers/pallet-profile/pallet-profile";
import {HireOrderCreateSelectCustomerPopoverComponent} from "../../components/hire-order-create-select-customer-popover/hire-order-create-select-customer-popover";
import {IssueNoteProvider} from "../../../IssueNoteModule/providers/issue-note/issue-note";
import {DatePipe} from "@angular/common";

/**
 * Generated class for the HireOrderMgmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-hire-order-mgmt',
  templateUrl: 'hire-order-mgmt.html',
})
export class HireOrderMgmtPage {


  //For Edit Information Card
  allPallets;
  allCustomers;
  customerChosenFromPopOver;
  hireOrder;
  advanceOrders;
  @ViewChild("customerName") customerName: HTMLInputElement;
  editHireOrderForm: FormGroup;
  paginationDataEditHO = {
    showPagination: false,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 1000
  };

  //For Linked Issue Orders Card
  issueNotesOfHireOrder;
  paginationDataLinkedIOHO = {
    showPagination: true,
    rowsPerPage: [10, 20, 30, 40, 50],
    currentRowsPerPage: 10,
    currentPage: 0,
    totalRow: 1000
  };

  //shared variables
  currentDate:string = new Date().toISOString();
  maxDate:number = new Date().getFullYear()+2;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private popOverCtrl: PopoverController,
              private formBuilder: FormBuilder,
              private hireOrderProvider: HireOrderProvider,
              private palletProvider: PalletProfileProvider,
              private custProvider: CustomerProvider,
              public platform: Platform,
              private alertCtrl: AlertController,
              private advanceOrderProvider: AdvanceOrderProvider,
              private issueNoteProvider: IssueNoteProvider) {

    this.hireOrder = this.navParams.get("hireOrder");

    this.editHireOrderForm = this.formBuilder.group({
      Hire_Order_ID:[''],
      Hire_Order_No:['', Validators.compose([Validators.maxLength(255)])],
      Customer_ID: ['', Validators.compose([Validators.required])],
      Qty: ['', Validators.compose([Validators.required, Validators.pattern(/^\d*[1-9]\d*$/)])],
      Pallet_Profile_ID: ['', Validators.compose([Validators.required])],
      Hire_Date:['',Validators.compose([Validators.required])],
      Expected_Issue_Date: ['', Validators.compose([Validators.required])],
      Delivery_Type: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      Delivery_Address: ['', Validators.compose([Validators.required])],
      Status: ['',Validators.required],
      Advance_Order: ['']
    });

    Promise.all([this.custProvider.getAllCustomers(),
      this.palletProvider.getAllPalletProfiles(),
      this.advanceOrderProvider.getListOfAONo(),
      this.issueNoteProvider.getIssueNoteOrdersFromHireOrderIdPaginated(this.hireOrder.Hire_Order_ID,
        this.paginationDataLinkedIOHO.currentPage,this.paginationDataLinkedIOHO.currentRowsPerPage)]).then( values =>{
      this.allCustomers=values[0];
      this.allPallets = values[1];
      this.advanceOrders = values[2];
      this.issueNotesOfHireOrder = values[3].data;
      this.paginationDataLinkedIOHO.totalRow = values[3].paging.TotalRecordCount;

      this.editHireOrderForm.controls["Hire_Order_ID"].setValue(this.hireOrder.Hire_Order_ID);
      this.editHireOrderForm.controls["Hire_Order_No"].setValue(this.hireOrder.Hire_Order_No);
      this.editHireOrderForm.controls["Customer_ID"].setValue(this.hireOrder.Customer_ID);
      this.editHireOrderForm.controls["Qty"].setValue(this.hireOrder.Qty);
      this.editHireOrderForm.controls["Pallet_Profile_ID"].setValue(this.hireOrder.Pallet_Profile_ID);
      this.editHireOrderForm.controls["Hire_Date"].setValue(this.hireOrder.Hire_Date);
      this.editHireOrderForm.controls["Expected_Issue_Date"].setValue(this.hireOrder.Expected_Issue_Date);
      this.editHireOrderForm.controls["Delivery_Type"].setValue(this.hireOrder.Delivery_Type);
      this.editHireOrderForm.controls["Delivery_Address"].setValue(this.hireOrder.Delivery_Address);
      this.editHireOrderForm.controls["Status"].setValue(this.hireOrder.Status);
      this.editHireOrderForm.controls["Advance_Order"].setValue(this.hireOrder.Advance_Order);

      for(let customer of this.allCustomers) {
        if(this.hireOrder.Customer_ID==customer.customer_ID)
        {
          this.customerName.value = customer.Customer_Name;
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HireOrderMgmtPage');
  }

  openHireOrderSelectCustomerPopOver(event) {
    let popover = this.popOverCtrl.create(HireOrderCreateSelectCustomerPopoverComponent,
      {'customers': this.allCustomers}, {cssClass:'custom-customer-popover'});

     popover.onDidDismiss(data => {
      if (data!=null) {
        this.customerChosenFromPopOver = data;
        this.editHireOrderForm.controls["Customer_ID"].setValue(this.customerChosenFromPopOver.customer_ID);
        this.editHireOrderForm.controls["Delivery_Address"].setValue(this.customerChosenFromPopOver.Address);
        this.customerName.value = this.customerChosenFromPopOver.Customer_Name;
      }
    });
    popover.present({
      ev:event
    });
  }

  editHireOrder(formData) {
    this.hireOrderProvider.patchEditHireOrder(formData).then( result => {
      console.log(result);
    });
    let alert1 = this.alertCtrl.create({
      title: 'Hire Order Edited',
      message: 'Hire Order Edited Successfully!',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert1.present();

  }

  revertEditInfoChanges() {
    this.editHireOrderForm.controls["Hire_Order_ID"].setValue(this.hireOrder.Hire_Order_ID);
    this.editHireOrderForm.controls["Hire_Order_No"].setValue(this.hireOrder.Hire_Order_No);
    this.editHireOrderForm.controls["Customer_ID"].setValue(this.hireOrder.Customer_ID);
    this.editHireOrderForm.controls["Qty"].setValue(this.hireOrder.Qty);
    this.editHireOrderForm.controls["Pallet_Profile_ID"].setValue(this.hireOrder.Pallet_Profile_ID);
    this.editHireOrderForm.controls["Hire_Date"].setValue(this.hireOrder.Hire_Date);
    this.editHireOrderForm.controls["Expected_Issue_Date"].setValue(this.hireOrder.Expected_Issue_Date);
    this.editHireOrderForm.controls["Delivery_Type"].setValue(this.hireOrder.Delivery_Type);
    this.editHireOrderForm.controls["Delivery_Address"].setValue(this.hireOrder.Delivery_Address);
    this.editHireOrderForm.controls["Status"].setValue(this.hireOrder.Status);
    this.editHireOrderForm.controls["Advance_Order"].setValue(this.hireOrder.Advance_Order);

    for(let customer of this.allCustomers) {
      if(this.hireOrder.Customer_ID==customer.customer_ID)
      {
        this.customerName.value = customer.Customer_Name;
      }
    }
  }

  onChangePaginationLinkedIOHO(event) {
    this.issueNoteProvider.getIssueNoteOrdersFromHireOrderIdPaginated(this.hireOrder.Hire_Order_ID,
      this.paginationDataLinkedIOHO.currentPage,this.paginationDataLinkedIOHO.currentRowsPerPage).then(result => {
        this.issueNotesOfHireOrder = result.data;
    })
  }
}
