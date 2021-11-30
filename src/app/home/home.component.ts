import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subscription } from "rxjs";

interface List {
    success: boolean;
    currency: string;
    data: Array<any>;
}

@Component({
    selector: 'home-app',
    templateUrl: './home.component.html',
    styleUrls: ['./app.component.css'],
})

@Injectable()

export class HomeComponent implements OnInit, OnDestroy {
    cartAviaList = [];
    aviaList = [];
    codeDispatchName: string;
    codeDestinationName: string;
    subscription: Subscription;
    recoodingValue;

    constructor(private http: HttpClient) { }
    addTicketToCart(fly): void {
        this.cartAviaList.push(fly);
    }
    addItem(myF) {
        const self = this;
        for (let i = 0; i < this.recoodingValue.length; i++) {
            if (this.recoodingValue[i].name === myF.value.dispatchName) {
                this.codeDispatchName = this.recoodingValue[i].code;
            } 
            if (this.recoodingValue[i].name === myF.value.destinationName) {
                this.codeDestinationName = this.recoodingValue[i].code;
            } 
        } 
        return this.subscription = self.http.get("/aviasales/v3" + "/prices_for_dates?origin=" + this.codeDispatchName + "&destination=" + this.codeDestinationName + "&currency=usd&departure_at=" + myF.value.dataFrom + "&return_at=" + myF.value.dataAt + "&sorting=price&direct=true&limit=10&token=a3cddf5edf865d1231497bdbc3dbcdc7/").subscribe((p:any) => self.addToAviaList(p)); 
        
    }

    addToAviaList(value: List): void {
        this.aviaList = [];
        for (let i = 0; i < value.data.length; i++) {
            this.aviaList.push(Object.values(value.data)[i])
        }  
        console.log(this.aviaList)
    }
    
    async ngOnInit() {
        await this.getValueFromJson();
    }

    public async getValueFromJson() {
        const assetTypes = this.http.get("assets/recooding.json");
        this.recoodingValue = await firstValueFrom(assetTypes);
        return this.recoodingValue;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}