import { NgModule} from '@angular/core';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module'

@NgModule({
    imports:  [ContactsRoutingModule],
    declarations: [ContactsComponent],
})
export class ContactsModule { }