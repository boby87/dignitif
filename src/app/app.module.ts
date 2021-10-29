import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DonateComponent } from './donate/donate.component';
import { PaymentComponent } from './payment/payment.component';
import {TransactionService} from "./Service/TransactionService";
import {BeneficiareService} from "./Service/BeneficiareService";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { SuccessfullComponent } from './successfull/successfull.component';

@NgModule({
  declarations: [
    AppComponent,
    DonateComponent,
    PaymentComponent,
    HeaderComponent,
    SuccessfullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [TransactionService,BeneficiareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
