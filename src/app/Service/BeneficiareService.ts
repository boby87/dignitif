import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Beneficiare} from "../Model/Beneficiare";
import {AdresseIP} from "./AdresseIP";

@Injectable()
export class BeneficiareService{

  constructor(public http:HttpClient) {
  }


  getAllbeneficiare(){
    return this.http.get<Beneficiare[]>(AdresseIP.host+"beneficiare/all")
  }

  getAllbeneficiareSuccess(){
    return this.http.get<Beneficiare[]>(AdresseIP.host+"beneficiare/all/success")
  }
}
