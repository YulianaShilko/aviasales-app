
import { Component, OnInit,  Output, EventEmitter, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from "../addedTickets.service";
import { ITicket } from "../addedTickets.service";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Subscription } from "rxjs";

interface Ticket {
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
}

@Component({
    selector: 'item-app',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css'],
})

export class ItemComponent implements OnInit, OnDestroy {
    public value: string;
	public tickets: ITicket[];
	private ticketService: TicketService;
    keyFromURL: any;
    routerOrigin: string;
    routerestination: string ;
    routerDeparture_at: string ;
    routerReturn_at: string ;
    valueInfoFromLS: Ticket;
    localKey: string;
    recoodingValue;
    @Output() ticketToBasketAdded = new EventEmitter();
    imageSrc: string =   './download-removebg-preview.png';

    constructor(private http: HttpClient, private router:Router, ticketService: TicketService) {
        this.ticketService = ticketService;
		this.tickets = [];
		this.value = "";
    }

    async ngOnInit() {
        await this.getValueFromJson();

        this.routerOrigin  = this.router.url.substring(13,16);
        this.routerestination =this.router.url.substring(29,32);
        this.routerDeparture_at =this.router.url.substring(46,65);
        this.routerReturn_at =this.router.url.substring(84,103); 
        this.keyFromURL = this.routerOrigin + this.routerestination + this.routerDeparture_at;
        console.log(this.router.url)

        for (let i=0; i < Object.keys(localStorage).length; i++) {
            console.log(Object.keys(localStorage)[i])
            if (this.keyFromURL === Object.keys(localStorage)[i]) {
                this.valueInfoFromLS = JSON.parse(Object.values(localStorage)[i])
            } 
        } 

        for (let i = 0; i < this.recoodingValue.length; i++) {
                if (this.recoodingValue[i].code === this.valueInfoFromLS.destination) {
                    this.valueInfoFromLS.destination = this.recoodingValue[i].name;
                    console.log(this.valueInfoFromLS.origin)
                } 
                if (this.recoodingValue[i].code === this.valueInfoFromLS.origin) {
                    this.valueInfoFromLS.origin = this.recoodingValue[i].name;
                    console.log(this.valueInfoFromLS.origin)
                } 
        }  
    }


    public async getValueFromJson() {
        const assetTypes = this.http.get("assets/recooding.json");
        this.recoodingValue = await firstValueFrom(assetTypes);
        return this.recoodingValue;
    }

    ngOnDestroy() {
        localStorage.removeItem(this.keyFromURL);
    }

    public reload(): void {
		this.ticketService
			.getTickets()
			.subscribe(
				(tickets: ITicket[] ) : void => {
					this.tickets = tickets;
				}
			);
	}

    addToBasket(ticket): void {
        alert('Билет добавлен в корзину')
        this.ticketToBasketAdded.emit(ticket);
        let value = JSON.stringify(this.valueInfoFromLS);
        let key = this.valueInfoFromLS.origin + this.valueInfoFromLS.destination + this.valueInfoFromLS.price;
        this.ticketService
            .createTicket(key, value)
            .subscribe(
            (key: string) : void => {
                this.value = "";
                this.reload();
            });
    }
}