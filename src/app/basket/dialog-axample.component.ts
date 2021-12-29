import { Component} from '@angular/core';
  
@Component({
    selector: 'not-found-app',
    template: `<h2 mat-dialog-title>Удалить?</h2>
                    <mat-dialog-action>
                        <button mat-button but mat-dialog-close mat-dialog-close="true">Да</button>
                        <button mat-button  but mat-dialog-close mat-dialog-close="false">Нет</button>
                    </mat-dialog-action>`
    ,
    styleUrls: ['./dialog-axample.component.css'],
})
export class DialogExampleComponent { }