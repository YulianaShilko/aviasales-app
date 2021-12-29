import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket.component'
import { ChangeQuantityTicketsComponent }   from './item-basket/add-quantity-ticket/add-quantity-ticket.component';
import { ItemBasketComponent }   from './item-basket/item-basket.component';
const itemRoutes: Routes = [

    {
        path: '',
        children: [
          { path: '', component: BasketComponent },
          { path: 'ChangeQuantity', component: ChangeQuantityTicketsComponent },
          { path: 'ItemBasket', component: ItemBasketComponent }
        ]
      }
];

@NgModule({
    imports:  [RouterModule.forChild(itemRoutes)],
    exports: [RouterModule]
})

export class BasketRoutingModule { }