import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component'

const itemRoutes: Routes = [
    { path: '', component: ContactsComponent },
];

@NgModule({
    imports:  [RouterModule.forChild(itemRoutes)],
    exports: [RouterModule]
})

export class ContactsRoutingModule { }