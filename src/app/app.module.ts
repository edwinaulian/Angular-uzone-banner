import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UzoneDetailtourpackageComponent } from './components/detail-tour-package/uzone-detailtourpackage.component';
import { NotFoundPageComponent } from './not-found-page';
import { AppRouting } from './app.routing';
import { OpenLinkInNewWindowDirective } from './uzonelink.directive';
import { CarouselModule } from 'angular4-carousel';
import { ContentComponent } from './components/main-content/uzone-content.component';
import { DetailtourService } from './services/detailtour.service';
import { BannerService } from './services/banner.service';
import { FirststepComponent } from './components/step-order-tour-package/uzone-firststep.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from './services/order.service';
import { UzoneSecondstepComponent } from './components/step-order-tour-package/uzone-secondstep.component';
import { UzoneThirtystepComponent } from './components/step-order-tour-package/uzone-thirtystep.component';
import { UzoneThirtystepCheckstatusComponent } from './components/step-order-tour-package/uzone-thirtystep-checkstatus.component';
import { UzoneSecondstepCreditcardComponent } from './components/step-order-tour-package/uzone-secondstep-creditcard.component';
import { UzoneWaitingComponent } from './components/step-order-tour-package/uzone-waiting.component';
import { environment } from '../environments/environment.prod';
import { DetailorderService } from './services/detailorder.service';
import { CountDown } from '../../node_modules/angular2-simple-countdown/countdown';
import { CustomnumberPipe } from './pipe/customnumber.pipe';
import { CreditcardService } from './services/creditcard.service';
import { TermConditionComponent } from './components/step-order-tour-package/uzone-term-condition.component';
import { InhtmlPipe } from './pipe/inhtml.pipe';
import { TextMaskModule } from 'angular2-text-mask';
import { UzoneEtiketComponent } from './components/step-order-tour-package/uzone-etiket.component';
import { DetailpemesananComponent } from './components/step-order-tour-package/uzone-detailorderuser.component';
import { UzoneFailedpaymentComponent } from './components/step-order-tour-package/uzone-failedpayment.component';
import { UzoneEtiketccComponent } from './components/step-order-tour-package/uzone-etiketcc.component';
import { DatePipes } from './pipe/date.pipe';
import { HaloComponent } from './halo.component';

if (environment.production) {
  enableProdMode();
}

@NgModule({
  declarations: [
    CountDown,
    AppComponent,
    OpenLinkInNewWindowDirective,
    NotFoundPageComponent,
    UzoneDetailtourpackageComponent,
    ContentComponent,
    FirststepComponent,
    UzoneSecondstepComponent,
    UzoneSecondstepCreditcardComponent,
    UzoneThirtystepComponent,
    UzoneThirtystepCheckstatusComponent,
    CustomnumberPipe,
    TermConditionComponent,
    UzoneWaitingComponent,
    InhtmlPipe,
    UzoneEtiketComponent,
    DetailpemesananComponent,
    UzoneFailedpaymentComponent,
    UzoneEtiketccComponent,
    DatePipes,
    HaloComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    AppRouting
  ],
  providers: [ DetailtourService, DetailorderService,  BannerService, OrderService, CreditcardService, CustomnumberPipe, InhtmlPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
