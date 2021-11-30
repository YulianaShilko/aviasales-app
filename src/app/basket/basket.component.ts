import { Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketService } from "../addedTickets.service";
import { ITicket } from "../addedTickets.service";

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
    selector: 'basket-app',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css'],
})
    
export class BasketComponent implements OnInit, OnDestroy {
  
	public tickets: ITicket[];
	private ticketService: TicketService;
    deleteTicketSubscription: Subscription;
    renderTicketSubscription: Subscription;
    localStoragevalues: Array<Countries>;
    keys: Array<string>;
    i: number ;
    @Output() onChanged = new EventEmitter<boolean>();
    @Output() fromBasketDeleted = new EventEmitter();
    @Input() localStoragevalue: Countries;
    @Output() quantatyCheckedFly: number = 0;
    
    constructor(ticketService: TicketService ) {
		this.ticketService = ticketService;
		this.tickets = [];
	}

    ngOnInit() {
        this.reload();
    }

    public reload() : void {
		this.renderTicketSubscription = this.ticketService
			.getTickets()
			.subscribe(
				(tickets: ITicket[] ) : void => {
					this.tickets = tickets; 
                    this.keys = [];
                    for (let i=0; i < this.tickets.length; i++) {
                        this.keys.push(this.tickets[i].name)
                    }
                    this.localStoragevalues = [],
                    this.i = this.keys.length;
                    
                    while (this.i--) {
                        this.localStoragevalues.push(JSON.parse(this.keys[this.i]));
                    } 
                    
			});
	}

    deleteFromBasket(localStoragevalue): void {
        alert('Билет удален из корзины')
        this.fromBasketDeleted.emit(localStoragevalue);
        this.remove({
            id: localStoragevalue.origin + localStoragevalue.destination + localStoragevalue.price,
            name: localStoragevalue,
            quantity: 0,
            totalPrice: 0,
        });
    }

    public remove(ticket: ITicket ) : void {
        console.log(ticket)
		this.tickets = this.tickets.filter(
			(value: ITicket ) : boolean => {
				return( value !== ticket );
			});

        this.deleteTicketSubscription = this.ticketService
			.removeTicket(ticket.id)
			.subscribe(
				() : void => {
					this.reload();
				}
			);
	}

    ngOnDestroy() {
        if (this.deleteTicketSubscription) {
            this.deleteTicketSubscription.unsubscribe();
            this.deleteTicketSubscription = null;
        }
        if (this.renderTicketSubscription) {
            this.renderTicketSubscription.unsubscribe();
            this.renderTicketSubscription= null;
        }
    }
}

   