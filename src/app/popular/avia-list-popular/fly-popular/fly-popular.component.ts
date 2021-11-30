import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'fly-popular',
  template: `
        <table class="table avia-list-table">
            <thead class="avia-list-table__header">
                <tr>
                    <th class="avia-list-table__cell">Место отправления</th>
                    <th class="avia-list-table__cell">Место прибытия</th>
                    <th class="avia-list-table__cell">Дата вылета</th>
                    <th class="avia-list-table__cell">Дата прибытия</th>
                    <th class="avia-list-table__cell">Цена</th>
                </tr>
            </thead>
            <tbody class="avia-list-table__body">
                <tr>
                    <td class="avia-list-table__cell">{{flyPopular.origin}}</td>
                    <td class="avia-list-table__cell">{{flyPopular.destination}}</td>
                    <td class="avia-list-table__cell">{{flyPopular.departure_at}}</td>
                    <td class="avia-list-table__cell">{{flyPopular.return_at}}</td>
                    <td class="avia-list-table__cell">{{flyPopular.price}} USD <button (click)="addTicketToCart(flyPopular)" type="button" class="avia-list-table__button">add</button></td>
                </tr>
            </tbody>
        </table>                   
  `,
  styleUrls: ['./fly-popular.component.css'],
})

export class FlyPopularComponent  {
  data: any;
  id: any;
  origin: any;
  destination: any;
  departure_at: any;
  return_at: any;
  price: any;
  
  @Input() flyPopular: any;
  @Output() ticketAdded = new EventEmitter();
  @Output() infoInServiceAdded = new EventEmitter();

  public constructor(){
    
  }
  addTicketToCart(flyPopular): void {
    this.ticketAdded.emit(flyPopular);
  }
  addInfoInService(flyPopular): void {
    this.infoInServiceAdded.emit(flyPopular);

  }
}
/* <div class="view w-100">
                    <img class="d-block w-100" src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg" alt="First slide">
                    <div class="mask rgba-black-light waves-light" mdbWavesEffect></div>
                  </div>
                  <div class="carousel-caption">
                    <h3 class="h3-responsive">{{flyPopular.origin}} - {{flyPopular.destination}}</h3>
                    <p>First text</p>
                  </div>  */
/*  */