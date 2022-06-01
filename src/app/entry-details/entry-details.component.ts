import {Component, OnInit} from '@angular/core';
import {Booking, Entry, User} from "../shared/entry";
import {EntryStoreService} from "../shared/entry-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EntryFactory} from "../shared/entry-factory";
import {AuthenticationService} from "../shared/authentication.service";
import {UserFactory} from "../shared/user-factory";
import {BookingFactory} from "../shared/booking-factory";
import {BookingUser} from "../shared/booking-user";

@Component({
  selector: 'bs-entry-details',
  templateUrl: './entry-details.component.html',
  styles: [
  ]
})
export class EntryDetailsComponent implements OnInit{
  entry: Entry = EntryFactory.empty();
  user: User = UserFactory.empty();
  booking: Booking = BookingFactory.empty();

  constructor(
    private bs: EntryStoreService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSingle(Number(params['id']))
      .subscribe(b => this.entry = b);
    window.setTimeout(()=>console.log(this.entry),500);
    console.log(typeof params['id']);
  }

  removeEntry(){
    if(confirm('Eintrag wirklich löschen?')) {
      this.bs.remove(this.entry.id.toString())
        .subscribe(res => this.router.navigate(['../'], { relativeTo:
        this.route}));
    }
  }

  bookEntry(booking:Booking){
    if(confirm('Eintrag wirklich buchen?')) {
      let object = new BookingUser(0,0);
      object.user_id = this.authService.getCurrentUserId();
      object.booking_id = this.entry.id;
      console.log(object);
      this.bs.updateBooking(object).subscribe(b => {alert('Nachhilfestunde wurde gebucht')});
    }
  }
}
