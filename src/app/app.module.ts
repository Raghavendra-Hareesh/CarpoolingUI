import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { BookRideComponent } from './book-ride/book-ride.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { RideCardComponent } from './ride-card/ride-card.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LandingPageComponent,
    LoginComponent,
    HomepageComponent,
    HeaderComponent,
    BookRideComponent,
    OfferRideComponent,
    RideCardComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
