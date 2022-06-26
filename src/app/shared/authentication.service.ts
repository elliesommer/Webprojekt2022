import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import jwt_decode from "jwt-decode";
import {User} from "./user";
import {EntryStoreService} from "./entry-store.service";
import {UserFactory} from "./user-factory";

interface Token {
  exp: number;
  user: {
    id: string
    is_searching: boolean
  };
}

@Injectable()
export class AuthenticationService {
  user: User = UserFactory.empty();
  private api: string =
    "http://nachhilfe22.s1910456038.student.kwmhgb.at/api/auth";
    //'http://localhost:8080/api/auth';

  constructor(private http: HttpClient, private bs: EntryStoreService) { }

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public getCurrentUserId() {
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public setSessionStorage(token: string) {
    //console.log("Storing token");
    //console.log(jwt_decode(token));
    const decodedToken = jwt_decode(token) as Token;
    //console.log(decodedToken);
    //console.log(decodedToken.user.id);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userId", decodedToken.user.id);
    sessionStorage.setItem("is_searching",decodedToken.user.is_searching.toString());
  }

  logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    //console.log("logged out");
  }

  public isLoggedIn() {
    if (sessionStorage.getItem("token")) {
      let token: string = <string>sessionStorage.getItem("token");
      //console.log(jwt_decode(token));
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        //console.log("token expired");
        sessionStorage.removeItem("token");
        return false;
      } return true;
    } else {
      return false;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  isSearching(){
    //this.bs.getUser(Number(sessionStorage.getItem("userId"))).subscribe(u => this.user = u);
    //return this.user.is_searching;
    console.log("checking user status");
    return sessionStorage.getItem("is_searching")=="0"?false:true;
  }

  isBooked(){
    //this.bs.getUser(Number(sessionStorage.getItem("userId"))).subscribe(u => this.user = u);
    //return this.user.is_searching;
    console.log("checking booked status");
    return sessionStorage.getItem("is_booked")=="0"?false:true;
  }
}
