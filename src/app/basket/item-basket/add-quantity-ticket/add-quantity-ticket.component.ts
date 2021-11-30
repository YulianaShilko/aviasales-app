import { Component, EventEmitter, Input, Output} from '@angular/core';
       
@Component({
    selector: 'add-quantity-ticket-comp',
    templateUrl: './add-quantity-ticket.component.html',
    styleUrls: ['./add-quantity-ticket.component.css'],
})
export class ChangeQuantityTicketsComponent { 
    @Output() onChanged = new EventEmitter<boolean>();
    change(increased:any) {
        this.onChanged.emit(increased);
    }
} 