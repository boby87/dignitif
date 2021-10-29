import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DonateComponent} from "./donate/donate.component";
import {PaymentComponent} from "./payment/payment.component";
import {SuccessfullComponent} from "./successfull/successfull.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'donate'},
  {path: 'donate', component: DonateComponent,},
  {path: 'payment', component: PaymentComponent,},
  {path: 'success', component: SuccessfullComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
