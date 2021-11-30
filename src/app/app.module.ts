import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent }   from './app.component';
import { FormsModule }   from '@angular/forms';
import { InputStartComponent }   from './home/input/input-start.component';
import { AviaListComponent }   from './home/avia-list/avia-list.component';
import { FlyComponent }   from './home/avia-list/fly/fly.component';

import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import {Routes, RouterModule} from '@angular/router';
import { MainComponent }   from './main/main.component';
import { HomeComponent }   from './home/home.component';
import { NotFoundComponent }   from './not-found.component';
import { ItemComponent}   from './item/item.component';
import { BasketComponent }   from './basket/basket.component';
import { AddToBasketComponent }   from './item/add-to-basket/add-to-basket.component';
import { ItemBasketComponent }   from './basket/item-basket/item-basket.component';
import { TicketService } from "./addedTickets.service";
import { LocalStorageService } from "./SetStorageService.service";
import { ChangeQuantityTicketsComponent } from "./basket/item-basket/add-quantity-ticket/add-quantity-ticket.component";
import { PopularComponent }   from './popular/popular.component';
import { AviaListPopularComponent }   from './popular/avia-list-popular/avia-list-popular.component';
import { FlyPopularComponent }   from './popular/avia-list-popular/fly-popular/fly-popular.component';
import { InputPopularStartComponent }   from './popular/input-popular/input-popular-start.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const itemRoutes: Routes = [
    { path: 'item', component: ItemComponent },
];

const appRoutes: Routes =[
    { path: '', component: MainComponent },
    { path: 'cheap', component: HomeComponent },
    { path: 'cheap/item', component: HomeComponent, children: itemRoutes },
    { path: 'popular', component: PopularComponent },
    { path: 'basket', component: BasketComponent },
    { path: 'item', component: ItemComponent },
    { path: 'contacts', 
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
];

@NgModule({
    imports:  [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientJsonpModule, RouterModule.forRoot(appRoutes), MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,],

    declarations: [ AppComponent, InputStartComponent,  AviaListComponent, FlyComponent, PopularComponent , InputPopularStartComponent, AviaListPopularComponent, FlyPopularComponent,
    HomeComponent, MainComponent, BasketComponent, ItemComponent, AddToBasketComponent, ItemBasketComponent, ChangeQuantityTicketsComponent, NotFoundComponent,
   ],
   
    providers: [TicketService, LocalStorageService],
    bootstrap:    [ AppComponent ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }