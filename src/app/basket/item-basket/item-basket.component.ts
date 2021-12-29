import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { TicketService } from "../../addedTickets.service";
import { ITicket } from "../../addedTickets.service";
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-axample.component'
import { LocalStorageService } from "../../SetStorageService.service";
import { TotalService } from "../../addedTotal.service";
import { ITotalTickets } from "../../addedTotal.service";
import { Observable } from "rxjs";
import { of } from 'rxjs';

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
    private localStorageService: LocalStorageService;
    public tickets: ITicket[];
    totalService: TotalService;
	private ticketService: TicketService;
    public totalTickets: ITotalTickets;
    quantatyCheckedFly: number = 0;
    changedPrice:number = 0; 
    totalQuantity: number;
    totalPrice: number;
    @Output() onChanged = new EventEmitter<boolean>();
    @Input() localStoragevalue: Countries;
    @Output() fromBasketDeleted = new EventEmitter();

    public constructor(ticketService: TicketService,totalService: TotalService, localStorageService: LocalStorageService , public dialog: MatDialog ) {
		this.ticketService = ticketService;
        this.totalService = totalService;
        this.localStorageService = localStorageService
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
        let dialogRef = this.dialog.open(DialogExampleComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === "true") {
                this.fromBasketDeleted.emit(localStoragevalue);
            }
        })  
    }
    getTotal(x): Observable<number> {
        this.totalQuantity += x;
        return of(this.totalQuantity);
    }

    change(increased:any){
        if (increased == true) {
            this.quantatyCheckedFly++; 
            this.changedPrice += this.localStoragevalue.price;
            this.totalService.getTotalTickets().subscribe((snap) => { 
                snap.quantity++;
                let p = {quantity : snap.quantity}
                this.localStorageService.setItem("totalQuantity", p);
            }) 
            this.totalService.getTotalPriceTickets().subscribe((snap) => { 
                snap.price += this.localStoragevalue.price;
                let p = {price : snap.price}
                this.localStorageService.setItem("totalPrice", p);
            }) 
        } else {
            this.quantatyCheckedFly--;
            this.changedPrice -= this.localStoragevalue.price;
            this.totalService.getTotalTickets().subscribe((snap) => { 
                snap.quantity--;
                let p = {quantity : snap.quantity}
                this.localStorageService.setItem("totalQuantity", p);
            })
            this.totalService.getTotalPriceTickets().subscribe((snap) => { 
                snap.price -= this.localStoragevalue.price;
                let p = {price : snap.price}
                this.localStorageService.setItem("totalPrice", p);
            }) 
        }
        this.ticketService.
            changeQuantityTicket(this.quantatyCheckedFly, this.changedPrice, JSON.stringify(this.localStoragevalue)) 

    }
}