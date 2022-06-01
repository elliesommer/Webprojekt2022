import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EntryFactory} from "../shared/entry-factory";
import {ActivatedRoute, Router} from "@angular/router";
import {EntryStoreService} from "../shared/entry-store.service";
import {Entry} from "../shared/entry";
import {EntryFormErrorMessages} from "./entry-form-error-messages";
import {UserFactory} from "../shared/user-factory";

@Component({
  selector: 'bs-entry-form',
  templateUrl: './entry-form.component.html',
  styles: [
  ]
})
export class EntryFormComponent implements OnInit {
  entryForm: FormGroup;
  entry = EntryFactory.empty();
  user = UserFactory.empty();
  errors: {[key: string]: string} = {};
  isUpdatingEntry = false;
  bookings: FormArray;

  constructor(
    private fb: FormBuilder,
    private bs: EntryStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entryForm = this.fb.group({});
    this.bookings = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id){
      this.isUpdatingEntry = true;
      this.bs.getSingle(id).subscribe(entry => {
        this.entry = entry;
        this.initEntry();
      });
    }
    this.initEntry();
  }

  initEntry(){
    this.buildBookingsArray();
    this.entryForm = this.fb.group({
      id: this.entry.id,
      title: [this.entry.title, Validators.required],
      subject: [this.entry.subject, Validators.required],
      description: this.entry.description,
      bookings: this.bookings,
    });
    this.entryForm.statusChanges.subscribe(() =>
    this.updateErrorMessages());
  }

  buildBookingsArray() {
    if(this.entry.bookings){
      this.bookings = this.fb.array([]);
      for(let bkg of this.entry.bookings) {
        let fg = this.fb.group({
          id: new FormControl(bkg.id),
          day: new FormControl(bkg.day, [Validators.required]),
          from: new FormControl(bkg.from, [Validators.required]),
          to: new FormControl(bkg.to, [Validators.required]),
          is_booked: false
        });
        this.bookings.push(fg);
      }
    }
  }

  addBookingsControl(){
    this.bookings.push(this.fb.group({id: 0, day: null, from: null, to: null}));
  }

  submitForm(){
    //filter empty values
    /*this.entryForm.value.bookings = this.entryForm.value.bookings.filter(
      (bookings: {})
    );*/

    const entry: Entry = EntryFactory.formObject(this.entryForm.value);
    console.log(entry);


    if(this.isUpdatingEntry){
      this.bs.update(entry).subscribe(res => {
        this.router.navigate(["../../entries", entry.id], {
          relativeTo: this.route
        });
      });
    } else {
      entry.user_id = 1; //just for testing
      console.log(entry);
      this.bs.create(entry).subscribe(res => {
        this.entry = EntryFactory.empty();
        this.entryForm.reset(EntryFactory.empty());
        this.router.navigate(["../entries"], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages(){
    console.log("Is Invalid? " + this.entryForm.invalid);
    this.errors = {};
    for (const message of EntryFormErrorMessages){
      const control = this.entryForm.get(message.forControl);
      if(
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
