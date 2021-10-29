import { Component, OnInit } from '@angular/core';
import {BeneficiareService} from "../Service/BeneficiareService";
import {Beneficiare} from "../Model/Beneficiare";
import {TransactionCollection} from "../Model/TransactionCollection";
import {TransactionService} from "../Service/TransactionService";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  beneficiares:Beneficiare[]=[];
  beneficiareseccess:Beneficiare[]=[];
  transaction:TransactionCollection=new TransactionCollection();
  transactions:TransactionCollection[]=[];
  is_loding:boolean=false;
  index:number=-1;
  constructor(public beneficaireService:BeneficiareService,public transactionService:TransactionService) { }

  ngOnInit(): void {
    this.getAllBenefiacire();
    this.getAllDisbursement();
  }

  getAllBenefiacire(){
    this.beneficaireService.getAllbeneficiare().subscribe(
      data=>{
        this.beneficiares=data;
      }
    )
  }
  getAllBenefiacireSuccess(){
    this.beneficaireService.getAllbeneficiareSuccess().subscribe(
      data=>{
        this.beneficiareseccess=data;
      }
    )
  }

  payer(beneficiare:Beneficiare,i:number){
    this.index=i;
  let  transaction:TransactionCollection=new TransactionCollection();
  transaction.phone=beneficiare.phone;
  transaction.montant=beneficiare.montant;
  this.is_loding=true;
  this.transactionService.registerdisboursement(transaction).subscribe(
    data=>{
      transaction=data;
      let index=this.beneficiares.findIndex(i=>i.phone==data.phone);
      this.beneficiares[index].status=data.status;
      this.beneficiareseccess.push(this.beneficiares[index]);
      this.beneficiares.splice(index,1);
      this.is_loding=false;
      this.index=-1;
      this.transactions.push(data);
    },error => {
      this.is_loding=false;
      this.index=-1;
    }
  )
  }
  tout_payer() {
    this.beneficiares.forEach((b,index)=>{
      this.payer(b,index)
    })

  }

  getAllDisbursement(){
    this.transactionService.getAlldisbursement().subscribe(
      data=>{
        this.transactions=data;
      }
    )
  }
}
