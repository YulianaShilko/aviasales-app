import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import {LoaderService} from '../loader.service';

interface List {
    success: boolean;
    currency: string;
    data: Array<Ticket>;
}

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
    selector: 'popular-app',
    template: `
    <div class="popular__header">
        <div class="main__img">
            <div class="container">
                <div class="loading" *ngIf="isLoading">  </div>
                <input-popular-start (newItemEvent)="addItem($event)"></input-popular-start>
            </div>
        </div>
    </div> 
    <div class="container">
        <avia-list [flies]="aviaListPopular" (ticketAdded)="addTicketToCart($event)"></avia-list>
    </div>
    
    `,
    styleUrls: ['./popular.component.css'],
})

@Injectable()

export class PopularComponent implements OnInit {
    aviaListPopular = [];
    cartAviaListPopular = [];
    aviaListPopular0 = [];
    codeDispatchName: string;
    codeDestinationName: string;
    recoodingValue;
    isLoading: boolean;
    public loaderService: LoaderService;

    constructor(private http: HttpClient, loaderService: LoaderService) { 
        this.loaderService = loaderService
    }

    addTicketToCart(fly): void {
        this.cartAviaListPopular.push(fly);
    } 
    addItem(myF) {
        this.loaderService.display(true);
        const self = this;
        for (let i = 0; i < this.recoodingValue.length; i++) {
            if (this.recoodingValue[i].name === myF.value.dispatchName) {
                this.codeDispatchName = this.recoodingValue[i].code;
            } 
        } 
        return self.http.get("/v1" + "/city-directions?origin=" + this.codeDispatchName + "&currency=usd&token=a3cddf5edf865d1231497bdbc3dbcdc7/")
                        .subscribe((p:any) => {
                            this.loaderService.display(false);
                            console.log(p.data)
                            this.aviaListPopular0 = [];
                            this.aviaListPopular0.push(Object.values(p.data))
                            
                            this.aviaListPopular = [] 
                            for (let i = 0; i < this.recoodingValue.length; i++) {
                                for (let j = 0; j < this.aviaListPopular0[0].length; j++) {
                                    if (this.recoodingValue[i].code === this.aviaListPopular0[0][j].destination) {
                                        this.aviaListPopular0[0][j].destination = this.recoodingValue[i].name;
                                    } 
                                    if (this.recoodingValue[i].code === this.aviaListPopular0[0][j].origin) {
                                        this.aviaListPopular0[0][j].origin = this.recoodingValue[i].name;
                                    } 
                                }
                            } 
                            this.aviaListPopular = this.aviaListPopular0[0];
                            console.log(this.aviaListPopular)
                        })
    }
    
    async ngOnInit() {
        await this.getValueFromJson();

        this.loaderService.status.subscribe((val: boolean) => {
            this.isLoading = val;
        });
    }

    public async getValueFromJson() {
        const assetTypes = this.http.get("assets/recooding.json");
        this.recoodingValue = await firstValueFrom(assetTypes);
        return this.recoodingValue;
    }
}