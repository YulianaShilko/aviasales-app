import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from 'rxjs';
import { throwError } from 'rxjs';
import { LocalStorageService } from "./SetStorageService.service";
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AsyncSubject } from 'rxjs';

export interface ITotalTickets {
	quantity: number
}
export interface ITotalPriceTickets {
	price: number
}

@Injectable()
export class TotalService {
	private localStorageService: LocalStorageService;
	changedQuantity: Subject<ITotalTickets> = new BehaviorSubject<ITotalTickets>(null);
	changedPrice: BehaviorSubject<ITotalPriceTickets> = new BehaviorSubject<ITotalPriceTickets>(null);
	
	constructor( localStorageService: LocalStorageService ) {
		this.localStorageService = localStorageService;
	}
	
	public getTotalTickets() : Observable<ITotalTickets> {
		return (of(this.loadTotalTickets()));
	}

	private loadTotalTickets() : ITotalTickets {
		let totalTickets = <ITotalTickets>this.localStorageService.getItem("totalQuantity");
		this.changedQuantity.next(totalTickets);
		return (totalTickets);	
	}

	public getTotalPriceTickets() : Observable<ITotalPriceTickets> {
		return (of(this.loadTotalPriceTickets()));
	}

	private loadTotalPriceTickets() : ITotalPriceTickets {
		let totalPriceTickets = <ITotalPriceTickets>this.localStorageService.getItem("totalPrice");
		this.changedPrice.next(totalPriceTickets);
		return (totalPriceTickets);	
	}

}