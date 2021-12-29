import { Component} from '@angular/core';
  
@Component({
    selector: 'not-found-app',
    template: `<h2 mat-dialog-title>Способ оплаты</h2>
                    <mat-dialog-action>
                        <button mat-button but mat-dialog-close mat-dialog-close="true">Картой</button>
                        <button mat-button  but mat-dialog-close mat-dialog-close="false">На месте</button>
                    </mat-dialog-action>`
    ,
    styleUrls: ['./payment-modal.component.css'],
})
export class PaymentModalComponent { }