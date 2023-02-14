import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRideComponent } from './book-ride/book-ride.component';
import { HeaderComponent } from './header/header.component';
import { HistoryComponent } from './history/history.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { OfferRideComponent } from './offer-ride/offer-ride.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component:LandingPageComponent, children : [
    {path: 'login', component:LoginComponent},
    {path: 'signup', component:SignUpComponent},
    {path: '', component:SignUpComponent},
  ]},
  { path: 'services', component: HeaderComponent, children : [
    {path: '', component:HomepageComponent},
    {path: 'home', component:HomepageComponent},
    {path: 'book', component:BookRideComponent},
    {path: 'offer', component:OfferRideComponent}    
  ]},
  { path: 'user', component: HeaderComponent , children : [
    { path: 'myrides', component:HistoryComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
