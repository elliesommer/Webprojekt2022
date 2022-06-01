import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntryDetailsComponent} from "./entry-details/entry-details.component";
import { EntryListComponent} from "./entry-list/entry-list.component";
import { HomeComponent} from "./home/home.component";
import {EntryFormComponent} from "./entry-form/entry-form.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'entries', component: EntryListComponent},
  {path: 'entries/:id', component:EntryDetailsComponent},
  {path: 'admin', component: EntryFormComponent},
  {path: 'admin/:id', component: EntryFormComponent},
  {path: 'login', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
