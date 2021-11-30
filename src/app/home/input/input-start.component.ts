import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'input-start',
  templateUrl: './input-start.component.html',
  styleUrls: ['./input-start.component.css'],
})

export class InputStartComponent  {
  myForm : FormGroup;

  constructor(){
    this.myForm = new FormGroup({
        "dispatchName": new FormControl("Москва"),
        "destinationName": new FormControl("Сочи"),
        "dataFrom": new FormControl(),
        "dataAt": new FormControl()
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