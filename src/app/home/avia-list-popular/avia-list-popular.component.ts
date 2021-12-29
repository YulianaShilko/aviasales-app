import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TicketService } from "../../addedTickets.service";
import { ITicket } from "../../addedTickets.service";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Subscription } from "rxjs";

@Component({
  selector: 'avia-list-popular',
  template: ` 
              <ng-container>
              <mdb-carousel class="carousel slide carousel-fade back" [type]="'carousel-thumbnails'" [animation]="'fade'">
               <div class="fone"></div>
                <mdb-slide *ngFor="let flyPopular of fliesPopular" >
                <div> {{valueInRussia}}</div>
                <div class="full">
                    <div>
                        <img class="main__img" src="assets/img/pr.png" />
                    </div>
                    <div class="origin">
                        <div> {{flyPopular.origin}} </div>
                        <div> {{flyPopular.origin_airport}} </div>
                        <div> {{flyPopular.departure_at.substr(0, 10)}} </div>
                        <div> {{flyPopular.departure_at.substr(11, 8)}} </div>
                    </div>
                    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100" width="350" height="100">
                        <line x1="0" y1="50" x2="250" y2="50" stroke="black" stroke-width="8" marker-end="url(#arrowhead1)" />
                    </svg>
                    <div class="origin">
                        <div> {{flyPopular.destination}} </div>
                    </div>             
                </div>

                <div class="full">
                    <div>
                        <img class="main__img" src="assets/img/pr-back.png" />  </div>
                    <div class="origin">
                        <div> {{flyPopular.destination}} </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100" width="350" height="100">
                        <line x1="0" y1="50" x2="250" y2="50" stroke="black" stroke-width="8" marker-end="url(#arrowhead2)" />
                    </svg>
                    <div class="origin">
                        <div> {{flyPopular.origin}} </div>
                        <div> {{flyPopular.destination_airport}} </div>
                        <div> {{flyPopular.return_at.substr(0, 10)}} </div>
                        <div> {{flyPopular.return_at.substr(11, 8)}} </div>
                    </div>
                </div>
                <div class="final">
                  <div class="slider__header">  Цена - {{flyPopular.price}} USD</div>
                  <div class="slider_button">
                   <button (click)="addTicketToCart(flyPopular)" type="button" class="avia-list-table__button">В корзину</button>
                 
                  </div>
                </div>   
              </mdb-slide>
            </mdb-carousel>            
              
              
  `,
  styleUrls: ['./avia-list-popular.component.css'],
})

export class AviaListPopularComponent implements OnInit {

  public value: string;
	public tickets: ITicket[];
	private ticketService: TicketService;
  origins;
  valueInRussia;
  @Input() fliesPopular: any[];
  @Output() ticketAdded = new EventEmitter();
  @Output() infoInServiceAdded  = new EventEmitter();
  localKey: string;
  ticket:any;
  recoodingValue;

  constructor(ticketService: TicketService, private http: HttpClient) { 
    this.ticketService = ticketService;
		this.tickets = [];
		this.value = "";
    this.origins = [];
  }

  ngOnInit() {
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

  public async getValueFromJson() {
    const assetTypes = this.http.get("assets/recooding.json");
    this.recoodingValue = await firstValueFrom(assetTypes);
    return this.recoodingValue;
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