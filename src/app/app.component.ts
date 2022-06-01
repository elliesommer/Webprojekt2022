import { Component } from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";
import {EntryStoreService} from "./shared/entry-store.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public authService: AuthenticationService, private bs: EntryStoreService) {  }
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()) {
      return "Logout";
    } else {
      return "Login";
    }
  }

}
