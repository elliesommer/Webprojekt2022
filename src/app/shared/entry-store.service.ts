import { Injectable } from '@angular/core';
import {Entry, Booking, User} from "./entry";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {BookingUser} from "./booking-user";

@Injectable()
export class EntryStoreService {
  private api: string='http://nachhilfe22.s1910456038.student.kwmhgb.at/api';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Array<Entry>> (`${this.api}/entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id: number) : Observable<Entry>{
    return this.http.get<Entry>(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  create(entry: Entry): Observable<any> {
    return this.http.post(`${this.api}/entries`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  update(entry: Entry): Observable<any> {
    return this.http.put(`${this.api}/entries/${entry.id}`, entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.api}/entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any>{
    return throwError(error);
  }

  getAllSearch(searchTerm: string): Observable<Array<Entry>> {
    return this.http.get<Entry>(`${this.api}/entries/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateBooking(booking: BookingUser): Observable<any> {
    return this.http.put(`${this.api}/booking/${booking.booking_id}`, booking)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getUser(id: number) : Observable<User>{
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

}
