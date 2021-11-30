import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TicketService } from "../../addedTickets.service";
import { ITicket } from "../../addedTickets.service";

@Component({
  selector: 'avia-list-popular',
  template: ` 
  
  <ng-container *ngIf="fliesPopular else loading">
                  <fly-popular *ngFor="let flyPopular of fliesPopular" [flyPopular]="flyPopular" (ticketAdded)="addTicketToCart($event)" (infoInServiceAdded)="addInfoInService($event)"></fly-popular>
                
              </ng-container> 
                
              <ng-template #loading>
                <div>Загрузка данных...</div>
              </ng-template>
  `,
  styleUrls: ['./avia-list-popular.component.css'],
})

export class AviaListPopularComponent {

  public value: string;
	public tickets: ITicket[];
	private ticketService: TicketService;
  @Input() fliesPopular: any[];
  @Output() ticketAdded = new EventEmitter();
  @Output() infoInServiceAdded  = new EventEmitter();
  localKey: string;
  ticket:any;

  constructor(ticketService: TicketService) { 
    this.ticketService = ticketService;
		this.tickets = [];
		this.value = "";
  }

  addInfoInService(flyPopular): void {
    this.localKey = flyPopular.origin + flyPopular.destination + flyPopular.departure_at.substring(0, 19);
    localStorage.setItem(this.localKey, JSON.stringify(flyPopular));
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

  addTicketToCart(flyPopular): void {
    alert('Билет добавлен в корзину')
    this.ticketAdded.emit(flyPopular);
    let value = JSON.stringify(flyPopular);
    let key = flyPopular.origin + flyPopular.destination + flyPopular.price;
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