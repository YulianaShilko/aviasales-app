import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { TicketService } from "../../addedTickets.service";
import { ITicket } from "../../addedTickets.service";

interface Countries {
    origin: string;
    destination: string;
    origin_airport: string;
    airline: string;
    departure_at: string;
    destination_airport: string;
    duration: number;
    flight_number: string;
    link: string;
    price: number;
    return_at: string;
    return_transfers: number;
    transfers: number;
    quantity: number;
}


@Component({
  selector: 'item-basket',
  templateUrl: './item-basket.component.html',
  styleUrls: ['./item-basket.component.css'],
})

export class ItemBasketComponent  {

    public tickets: ITicket[];
	private ticketService: TicketService;

    quantatyCheckedFly: number = 0;
    changedPrice:number = 0; 

    @Output() onChanged = new EventEmitter<boolean>();
    @Input() localStoragevalue: Countries;
    @Output() fromBasketDeleted = new EventEmitter();

    public constructor(ticketService: TicketService ) {
		this.ticketService = ticketService;
		this.tickets = [];
	}

    ngOnInit() {
        this.reload();
    }

    public reload() : void {
		this.ticketService
			.getTickets()
			.subscribe(
				(tickets: ITicket[]): void => {
					this.tickets = tickets;
                    for (let i=0; i< this.tickets.length; i++) {
                        if (this.tickets[i].name === JSON.stringify(this.localStoragevalue)) {
                            this.quantatyCheckedFly = this.tickets[i].quantity;
                            this.changedPrice = this.tickets[i].totalPrice;
                        }
                    }
				}
			);
	}

    deleteFromBasket(localStoragevalue): void {
        this.fromBasketDeleted.emit(localStoragevalue);
    }

    change(increased:any){
        if (increased == true) {
            this.quantatyCheckedFly++; 
            this.changedPrice += this.localStoragevalue.price;
        } else {
            this.quantatyCheckedFly--;
            this.changedPrice -= this.localStoragevalue.price;
        }
        this.ticketService.
            changeQuantityTicket(this.quantatyCheckedFly, this.changedPrice, JSON.stringify(this.localStoragevalue)) 
    }
}