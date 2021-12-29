import { Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from './payment-modal.component'
import { TicketService } from "../addedTickets.service";
import { ITicket } from "../addedTickets.service";
import { TotalService } from "../addedTotal.service";
import { ITotalTickets } from "../addedTotal.service";
import { ITotalPriceTickets } from "../addedTotal.service";
import { Observable } from "rxjs";
import { of, from } from 'rxjs';
import { LocalStorageService } from "../SetStorageService.service";
import { map } from 'rxjs/operators';


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
    private localStorageService: LocalStorageService;
	public tickets: ITicket[];
    public totalTickets: ITotalTickets;
    totalService: TotalService;
	private ticketService: TicketService;
    deleteTicketSubscription: Subscription;
    renderTicketSubscription: Subscription;
    localStoragevalues: Array<Countries>;
    totalQuantity: number; 
    totalPrice: number;
    keys: Array<string>;
    i: number ;
    totalWayPayment: string;
    @Output() onChanged = new EventEmitter<boolean>();
    @Output() fromBasketDeleted = new EventEmitter();
    @Input() localStoragevalue: Countries;
    @Output() quantatyCheckedFly: number;
    /* renderQuantity: Observable<number>|undefined; */
    renderQuantity: number = 0;

    constructor(ticketService: TicketService, totalService: TotalService, localStorageService: LocalStorageService, public dialog: MatDialog ) {
		this.ticketService = ticketService;
        this.totalService = totalService;
        this.localStorageService = localStorageService;
		this.tickets = [];
        this.totalQuantity = 0;  
        this.totalPrice = 0;
        this.totalWayPayment = '';
        
	}

    ngOnInit() {
        this.reload();
        this.reloadTotal()
        /* this.renderQuantity = this.totalService.cart.pipe(map((newCart) => { return newCart.quantity })); */
        this.totalService.changedQuantity.subscribe((newCart) => {  this.renderQuantity = newCart.quantity ;  console.log(newCart);});  
       this.totalService.changedPrice.subscribe((newPrice) => {  this.totalPrice = newPrice.price ;  console.log(newPrice)  });   
        console.log(this.totalService.changedPrice.getValue())

       
    }

    getTotalQuantity(x): Observable<number> {
        this.totalQuantity += x;
        return of(this.totalQuantity);
    }

    getTotalPrice(x): Observable<number> {
        this.totalPrice += x;
        return of(this.totalPrice);
    }
    
    public reload() : void {
		this.renderTicketSubscription = this.ticketService
			.getTickets()
			.subscribe(
				(tickets: ITicket[] ) : void => {
					this.tickets = tickets; 
                    this.keys = [];
                    for (let i=0; i < this.tickets.length; i++) {
                        this.keys.push(this.tickets[i].name);
                    this.localStoragevalues = [],
                    this.i = this.keys.length;
                    
                    while (this.i--) {
                        this.localStoragevalues.push(JSON.parse(this.keys[this.i]));
                    } 
                }   
			});
	}

    reloadTotal() {
        this.totalService
            .getTotalTickets()
            .subscribe(
                (totalTickets: ITotalTickets ) : void => {
                    for (let i=0; i < this.tickets.length; i++) {
                        this.getTotalQuantity(this.tickets[i].quantity).subscribe((snap) => { 
                            this.totalQuantity = snap;
                            let p = { quantity : snap }
                            this.localStorageService.setItem("totalQuantity", p);
                         }) 

                         this.getTotalPrice(this.tickets[i].totalPrice).subscribe((snap) => { 
                            this.totalPrice = snap;
                            let p = { price : snap }
                            this.localStorageService.setItem("totalPrice", p);
                         }) 
                    } 
                })    
    } 

    deleteFromBasket(localStoragevalue): void {
        this.fromBasketDeleted.emit(localStoragevalue);
        this.totalService
            .getTotalTickets()
            .subscribe(
                (totalTickets: ITotalTickets,  ) : void => {
                    let tickets = <ITicket[]>this.localStorageService.getItem("tickets");
                    console.log(tickets)
                    for (let i=0; i < tickets.length; i++) {
                        if (tickets[i].id === localStoragevalue.origin + localStoragevalue.destination + localStoragevalue.price) {
                            this.localStorageService.setItem("totalQuantity", { quantity : totalTickets.quantity -  tickets[i].quantity});
                        }
                    }
                })   
        this.totalService
            .getTotalPriceTickets()
            .subscribe(
                (totalPriceTickets: ITotalPriceTickets ) => {
                    let tickets = <ITicket[]>this.localStorageService.getItem("tickets");
                    for (let i=0; i < tickets.length; i++) {
                        if (tickets[i].id === localStoragevalue.origin + localStoragevalue.destination + localStoragevalue.price) {
                            console.log('good')
                            this.localStorageService.setItem("totalPrice", { price : totalPriceTickets.price -  tickets[i].totalPrice});
                        }
                    }
                }) 

        this.remove({
            id: localStoragevalue.origin + localStoragevalue.destination + localStoragevalue.price,
            name: localStoragevalue,
            quantity: 0,
            totalPrice: 0,
        });
        
    }

    public remove(ticket: ITicket ) : void {
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

    chooseWayPayment() {
        let dialogRef = this.dialog.open(PaymentModalComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === "true") {
                this.totalWayPayment = 'ОПЛАТА КАРТОЙ'
            } else {
                this.totalWayPayment = 'ОПЛАТА НА МЕСТЕ'
            }
        }) 
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

   