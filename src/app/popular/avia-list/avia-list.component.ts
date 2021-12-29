import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TicketService } from "../../addedTickets.service";
import { ITicket } from "../../addedTickets.service";
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { firstValueFrom } from "rxjs";
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'avia-list',
  templateUrl: './avia-list.component.html'
  ,
  styleUrls: ['./avia-list.component.css'],
})

export class AviaListComponent  implements OnInit {
  users$: Observable<any[]>
  public value: string;
	public tickets: ITicket[];
	private ticketService: TicketService;
  @Input() flies: any[];
  @Output() ticketAdded = new EventEmitter();
  @Output() infoInServiceAdded  = new EventEmitter();
  localKey: string;
  ticket:any;
  public searchText;
  public checkFirst;
  public checkSecond;
  recoodingValue;
  newDestination;
  newOrigin;
  data: any;
  id: any;
  origin: any;
  destination: any;
  departure_at: any;
  return_at: any;
  price: any;
  routeSubscription: Subscription;
  querySubscription: Subscription;
  

  constructor(private http: HttpClient, ticketService: TicketService, route: ActivatedRoute) { 
    this.ticketService = ticketService;
		this.tickets = [];
		this.value = "";
    this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
    this.querySubscription = route.queryParams.subscribe(
        (queryParam: any) => {
          this.origin = queryParam['origin'];
            this.destination = queryParam['destination'];
            this.departure_at = queryParam['departure_at'];
            this.return_at = queryParam['return_at'];
            this.price = queryParam['price'];
        }
    );
  }

  addInfoInService(fly): void {
    for (let i = 0; i < this.recoodingValue.length; i++) {
      if (this.recoodingValue[i].name === fly.destination) {
        this.newDestination = this.recoodingValue[i].code;
        console.log(this.newDestination)
      } 
      if (this.recoodingValue[i].name === fly.origin) {
        this.newOrigin = this.recoodingValue[i].code;
      } 
    }
    this.localKey = this.newOrigin + this.newDestination + fly.departure_at.substring(0, 19);
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

    let key = fly.origin + fly.destination +  fly.price;

    this.ticketService
      .createTicket(key, value)
      .subscribe(
        (key: string) : void => {
          this.value = "";
          this.reload();
        }
      );
  }

  async ngOnInit() {
    await this.getValueFromJson();
  }

  public async getValueFromJson() {
      const assetTypes = this.http.get("assets/recooding.json");
      this.recoodingValue = await firstValueFrom(assetTypes);
      return this.recoodingValue;
  }
 
}