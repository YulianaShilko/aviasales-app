import { NgModule} from '@angular/core';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { ChangeQuantityTicketsComponent }   from './item-basket/add-quantity-ticket/add-quantity-ticket.component';
import { ItemBasketComponent }   from './item-basket/item-basket.component';
import { CommonModule } from '@angular/common';


@NgModule({
    imports:  [BasketRoutingModule, CommonModule],
    declarations: [BasketComponent, ChangeQuantityTicketsComponent, ItemBasketComponent],
})
export class BasketModule { }