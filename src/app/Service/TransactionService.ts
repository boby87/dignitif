import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Beneficiare} from "../Model/Beneficiare";
import {AdresseIP} from "./AdresseIP";
import {TransactionCollection} from "../Model/TransactionCollection";

@Injectable()
export class TransactionService{


  constructor(public http:HttpClient) {
  }

  registercollection(collection:TransactionCollection){
    return this.http.post<TransactionCollection>(AdresseIP.host+"api/collection",collection)
  }
  registerdisboursement(disbursement:TransactionCollection){
    return this.http.post<TransactionCollection>(AdresseIP.host+"api/disbursement",disbursement)
  }

  registerAlldisboursement(disbursements:TransactionCollection[]){
    return this.http.post<TransactionCollection[]>(AdresseIP.host+"api/disbursements",disbursements)
  }

  getAllcolection(){
    return this.http.get<TransactionCollection>(AdresseIP.host+"api/all/collections")
  }
  getAlldisbursement(){
    return this.http.get<TransactionCollection[]>(AdresseIP.host+"api/all/disbursements")
  }

  getStatus(reference:string){
    return this.http.get<TransactionCollection>(AdresseIP.host+"api/collection/status/"+reference)
  }
}
