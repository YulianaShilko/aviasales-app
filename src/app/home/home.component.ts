import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subscription } from "rxjs";
import { BehaviorSubject } from 'rxjs';
import {LoaderService} from '../loader.service';

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
    isLoading: boolean;
    public loaderService: LoaderService;

    constructor(private http: HttpClient, loaderService: LoaderService) { 
        this.loaderService = loaderService
    }
    addTicketToCart(fly): void {
        this.cartAviaList.push(fly);
    }

    addItem(myF) {
        this.loaderService.display(true);
        const self = this;
        for (let i = 0; i < this.recoodingValue.length; i++) {
            if (this.recoodingValue[i].name === myF.value.dispatchName) {
                this.codeDispatchName = this.recoodingValue[i].code;
            } 
            if (this.recoodingValue[i].name === myF.value.destinationName) {
                this.codeDestinationName = this.recoodingValue[i].code;
            } 
        } 
        this.subscription = self.http.get("/aviasales/v3" + "/prices_for_dates?origin=" + this.codeDispatchName + "&destination=" + this.codeDestinationName + "&currency=usd&departure_at=" + myF.value.dataFrom + "&return_at=" + myF.value.dataAt + "&sorting=price&direct=true&limit=10&token=a3cddf5edf865d1231497bdbc3dbcdc7/")
                .subscribe((p:any) =>  {
                    this.loaderService.display(false);
                    self.addToAviaList(p); 
                    for (let i = 0; i < this.recoodingValue.length; i++) {
                        for (let j = 0; j < this.aviaList.length; j++) {
                            if (this.recoodingValue[i].code === this.aviaList[j].destination) {
                                this.aviaList[j].destination = this.recoodingValue[i].name;
                                console.log(this.aviaList[j].origin)
                            } 
                            if (this.recoodingValue[i].code === this.aviaList[j].origin) {
                                this.aviaList[j].origin = this.recoodingValue[i].name;
                                console.log(this.aviaList[j].origin)
                            } 
                        }
                    } 
                })
    }

    addToAviaList(value: List): void {
        this.aviaList = [];
        for (let i = 0; i < value.data.length; i++) {
            this.aviaList.push(Object.values(value.data)[i])
        }  
        
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

    ngOnDestroy() {
         if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        } 
    }
}