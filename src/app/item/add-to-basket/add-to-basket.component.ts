import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'to-basket',
  templateUrl: './add-to-basket.component.html',
  styleUrls: ['./add-to-basket.component.css'],

})

export class AddToBasketComponent  {
  ticket: any;
    @Output() ticketToBasketAdded = new EventEmitter();

    public constructor() {}

    addToBasket(ticket): void {
        this.ticketToBasketAdded.emit(ticket);
    }

}