import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";

interface List {
    success: boolean;
    currency: string;
    data: Array<any>;
}

@Component({
    selector: 'popular-app',
    template: `
    <div class="popular__header">
        <div class="main__img">
            <div class="container">
                <input-popular-start (newItemEvent)="addItem($event)"></input-popular-start>
            </div>
        </div>
    </div> 
    <div class="container">
        <avia-list-popular [fliesPopular]="aviaListPopular" (ticketAdded)="addTicketToCart($event)"></avia-list-popular>
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

    constructor(private http: HttpClient) { }

    addTicketToCart(fly): void {
        this.cartAviaListPopular.push(fly);
    } 
    addItem(myF) {
        const self = this;
        for (let i = 0; i < this.recoodingValue.length; i++) {
            if (this.recoodingValue[i].name === myF.value.dispatchName) {
                this.codeDispatchName = this.recoodingValue[i].code;
            } 
        } 
        return self.http.get("/v1" + "/city-directions?origin=" + this.codeDispatchName + "&currency=usd&token=a3cddf5edf865d1231497bdbc3dbcdc7/").subscribe((p:any) => self.addToAviaListPopular(p));
    }

    addToAviaListPopular(value: List): void {
        this.aviaListPopular0 = [];
        this.aviaListPopular = [] 
        console.log(Object.values(value.data))
        this.aviaListPopular0.push(Object.values(value.data))
        this.aviaListPopular = this.aviaListPopular0[0];
        console.log(this.aviaListPopular)
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