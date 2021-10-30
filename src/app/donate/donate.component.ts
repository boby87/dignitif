import {Component, OnInit, TemplateRef} from '@angular/core';
import {TransactionService} from "../Service/TransactionService";
import {TransactionCollection} from "../Model/TransactionCollection";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  collection:TransactionCollection=new TransactionCollection();
  is_charge:boolean=false;
  is_status:boolean=false;
  modalRef: BsModalRef=new BsModalRef<any>();
  constructor(private modalService: BsModalService,public transactionService:TransactionService,public router:Router) { }

  ngOnInit(): void {
  }
  savedonateModal(template: TemplateRef<any>) {

    this.is_charge=true;
    this.is_status=false;
    this.transactionService.registercollection(this.collection).subscribe(
      data=>{
        this.is_charge=false;
        this.collection=data;
        if (data.modepayment=="MOMO"){
          if (data.status=="FAILED"){
            this.collection.message="Votre solde est insufisant";
          }else if (data.status=="PENDING"){
            this.collection.message="Merci de confirmer le paiement sur votre mobile et de cliquer sur le button pour continuer";
          }
        }else if (data.modepayment=="OM"||data.modepayment=="STRIPE"||data.modepayment=="PAYPAL"){
          this.collection.message="Merci de cliquer sur le button pour continuer l'opération de paiment";
        }

        this.modalRef = this.modalService.show(template);
      },error => {
        this.is_charge=false;
      }
    )
  }


  getstatus(collection1: TransactionCollection) {
    if (collection1.modepayment=="OM"||collection1.modepayment=="STRIPE" ||collection1.modepayment=="PAYPAL"){
      this.is_status=true;
      window.open(collection1.url_direction, "_blank");
      this.collection.message="Merci de cliquer sur le button pour continuer l'opération de paiment sur "+collection1.modepayment;
    }else {
      this.transactionService.getStatus(collection1.reference).subscribe(
        data=>{
          if (data.modepayment=="MOMO"){
            if (data.status=="FAILED"){
              this.is_status=true;
              this.collection.message="Votre solde est insufisant";
            }else if (data.status=="PENDING"){
              this.is_status=false;
              this.collection.message="Merci de confirmer le paiement sur votre mobile et de cliquer sur le button pour continuer";
            }else if (data.status=="SUCCESSFUL"){
              this.is_status=true;
              this.modalRef.hide();
              this.collection.message="Merci d'avoir confirmé le paiement nous vous remercions pour cela";
              this.router.navigateByUrl("success")
            }
          }
        },error => {
          this.collection.message=error.error.message;
        }
      )
    }

  }
}
