import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'input-popular-start',
  template: `
              <p [ngClass]="{start__header:true}">Возвращает самые популярные направления из заданного города</p>
                  <form [formGroup]="myForm" novalidate (ngSubmit)="submit($event)" class="start__forma">
                  <div class="form-group">
                        <label>Откуда</label>
                        <input class="form-control" name="name" formControlName="dispatchName" />
                    </div>
                    <div  [ngStyle]="{'margin-top':'30px'}">
                        <button (click)="addNewItem(this.myForm)" class= "form-group_button">
                            Найти
                        </button>
                    </div>
                </form>
  `,
  styleUrls: ['./input-popular-start.component.css'],
})

export class InputPopularStartComponent  {
  myForm : FormGroup;

  constructor(){
    this.myForm = new FormGroup({
        "dispatchName": new FormControl("Москва")
    });
  }
  

  submit(event: Event){
   event.preventDefault();
  }

  @Output() newItemEvent = new EventEmitter<string>();
  
  addNewItem(value: any) {
    this.newItemEvent.emit(value);
  }
}