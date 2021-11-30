import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TicketService } from "../../addedTickets.service";
import { ITicket } from "../../addedTickets.service";

@Component({
  selector: 'avia-list',
  templateUrl: './avia-list.component.html'
  ,
  styleUrls: ['./avia-list.component.css'],
})

export class AviaListComponent {

  public value: string;
	public tickets: ITicket[];
	private ticketService: TicketService;
  @Input() flies: any[];
  @Output() ticketAdded = new EventEmitter();
  @Output() infoInServiceAdded  = new EventEmitter();
  localKey: string;
  ticket:any;

  constructor(ticketService: TicketService) { 
    this.ticketService = ticketService;
		this.tickets = [];
		this.value = "";
  }

  addInfoInService(fly): void {
    this.localKey = fly.origin + fly.destination + fly.departure_at.substring(0, 19);
    localStorage.setItem(this.localKey, JSON.stringify(fly));
  }

  public reload() : void {
		this.ticketService
			.getTickets()
			.subscribe(
				(tickets: ITicket[]) : void => {
					this.tickets = tickets;
				}
			);
	}

  addTicketToCart(fly): void {
    alert('Билет добавлен в корзину')
    this.ticketAdded.emit(fly);
    let value = JSON.stringify(fly);
    let key = fly.origin + fly.destination + fly.price;
    this.ticketService
      .createTicket(key, value)
      .subscribe(
        (key: string) : void => {
          this.value = "";
          this.reload();
        }
      );
  }
}