
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable( { providedIn: 'root'} )
export class DataService {

  private ticketSource = new BehaviorSubject("default");
  currentticket = this.ticketSource.asObservable();

  constructor() { }

  changeticket(ticket: any) {
    this.ticketSource.next(ticket)
  }
}