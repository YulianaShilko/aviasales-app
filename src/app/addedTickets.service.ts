import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from 'rxjs';
import { throwError } from 'rxjs';
import { LocalStorageService } from "./SetStorageService.service";

export interface ITicket {
	id: string;
	name: string;
	quantity: number;
	totalPrice: number;
}

@Injectable()
export class TicketService {
	private localStorageService: LocalStorageService;
	
	constructor( localStorageService: LocalStorageService ) {
		this.localStorageService = localStorageService;
	}


	public createTicket(id: string, name: string) : Observable<string> {
		let tickets = this.loadTickets();
		let ticket = {
			id: id,
			name: name,
			quantity: 0,
			totalPrice: 0,
		};
		this.localStorageService.setItem("tickets", tickets.concat(ticket));
		return (of(ticket.id));
	}



	public getTickets() : Observable<ITicket[]> {
		return (of(this.loadTickets()));
	}

	public removeTicket(id: string) : Observable<void> {
		let tickets = this.loadTickets();
		let ticketIndex = tickets.findIndex(
			(item: ITicket) : boolean => {
				return (item.id === id );
			}
		);

		if (ticketIndex >= 0) {
			tickets = tickets.slice();
			tickets.splice(ticketIndex, 1);
			this.localStorageService.setItem("tickets", tickets);
			return (of(null));
		} else {
			return (throwError(() => new Error("Not Found")));
		}
	}

	public changeQuantityTicket(quantity: number, totalPrice: number, name: string): Observable<void> {
		let tickets = this.loadTickets();
		let ticketIndex = tickets.findIndex(
			(item: ITicket) : boolean => {
				return (item.name === name );
			}
		);

		if (ticketIndex >= 0) {
			tickets[ticketIndex].quantity = quantity;
			tickets[ticketIndex].totalPrice = totalPrice;
			this.localStorageService.setItem("tickets", tickets);
			return (of(null));

		} else {
			return (throwError(() => new Error("Not Found")));
		}
	}

	private loadTickets() : ITicket[] {
		let tickets = <ITicket[]>this.localStorageService.getItem("tickets");
		return (tickets || []);	}

}