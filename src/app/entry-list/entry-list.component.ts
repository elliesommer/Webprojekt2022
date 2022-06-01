import { Component, OnInit} from '@angular/core';
import {Entry, Booking, User} from "../shared/entry";
import {EntryStoreService} from "../shared/entry-store.service";


@Component({
  selector: 'bs-entry-list',
  templateUrl: './entry-list.component.html',
  styles: []
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(private bs:EntryStoreService){}

  ngOnInit() {
    this.bs.getAll().subscribe(res => this.entries = res);
  }
}
