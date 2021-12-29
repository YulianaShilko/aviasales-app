import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent }   from './app.component';
import { FormsModule }   from '@angular/forms';
import { InputStartComponent }   from './home/input/input-start.component';
import { AviaListComponent }   from './popular/avia-list/avia-list.component';
import { FlyComponent }   from './popular/avia-list/fly/fly.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { MainComponent }   from './main/main.component';
import { HomeComponent }   from './home/home.component';
import { ItemComponent}   from './item/item.component';
import { AddToBasketComponent }   from './item/add-to-basket/add-to-basket.component';
import { TicketService } from "./addedTickets.service";
import { TotalService } from "./addedTotal.service";
import { LocalStorageService } from "./SetStorageService.service";
import { PopularComponent }   from './popular/popular.component';
import { AviaListPopularComponent }   from './home/avia-list-popular/avia-list-popular.component';
import { InputPopularStartComponent }   from './popular/input-popular/input-popular-start.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogExampleComponent } from "./basket/dialog-axample.component";
import { PaymentModalComponent } from "./basket/payment-modal.component";
import { MaterialModule } from "./material.module"
import { LoaderService } from './loader.service';
import { CategoryPipe } from './popular/avia-list/category.pipe';
import { PricePipe } from './popular/avia-list/price.pipe';
import { PriceCopyPipe } from './popular/avia-list/price.pipe copy';

const itemRoutes: Routes = [
    { path: 'item', component: ItemComponent },
];

const appRoutes: Routes = [
    { path: '', component: MainComponent },
    { path: 'cheap', component: HomeComponent },
    { path: 'cheap/item', component: HomeComponent, children: itemRoutes },
    { path: 'popular', component: PopularComponent },
    { path: 'item', component: ItemComponent },
    { path: 'basket', 
    loadChildren: () => import('./basket/basket.module').then(m => m.BasketModule) },
    { path: 'contacts', 
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
];

@NgModule({
    entryComponents: [DialogExampleComponent, PaymentModalComponent],
    imports:  [MaterialModule, BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, HttpClientJsonpModule, RouterModule.forRoot(appRoutes), MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule],

    declarations: [DialogExampleComponent, PaymentModalComponent, AppComponent, InputStartComponent,  AviaListComponent, FlyComponent, PopularComponent , InputPopularStartComponent, AviaListPopularComponent, 
    HomeComponent, MainComponent, ItemComponent,  AddToBasketComponent, CategoryPipe, PricePipe, PriceCopyPipe
   ],
   
    providers: [TicketService, LocalStorageService, TotalService, LoaderService],
    bootstrap:    [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }