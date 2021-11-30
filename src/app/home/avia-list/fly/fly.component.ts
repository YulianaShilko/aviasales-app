import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'fly',
  templateUrl: './fly.component.html',
  styleUrls: ['./fly.component.css'],
})

export class FlyComponent  {
  data: any;
  id: any;
  origin: any;
  destination: any;
  departure_at: any;
  return_at: any;
  price: any;
  routeSubscription: Subscription;
  querySubscription: Subscription;
  
  @Input() fly: any;
  @Output() ticketAdded = new EventEmitter();
  @Output() infoInServiceAdded = new EventEmitter();

  public constructor(route: ActivatedRoute){
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
  addTicketToCart(fly): void {
    this.ticketAdded.emit(fly);
  }
  addInfoInService(fly): void {
    this.infoInServiceAdded.emit(fly);

  }
}