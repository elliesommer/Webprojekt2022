import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryListItemComponent } from './entry-list-item/entry-list-item.component';
import { EntryDetailsComponent } from './entry-details/entry-details.component';
import { EntryStoreService} from "./shared/entry-store.service";
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { SearchComponent } from './search/search.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    EntryListComponent,
    EntryListItemComponent,
    EntryDetailsComponent,
    HomeComponent,
    SearchComponent,
    EntryFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [EntryStoreService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
