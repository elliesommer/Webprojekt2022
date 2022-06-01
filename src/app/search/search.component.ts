import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, filter, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {Entry} from "../shared/entry";
import {EntryStoreService} from "../shared/entry-store.service";

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  foundEntries: Entry[] = [];
  isLoading = false;
  keyup = new EventEmitter<string>();
  @Output() entrySelected = new EventEmitter<Entry>();

  constructor(private bs: EntryStoreService) {
  }

  ngOnInit(){
    this.keyup.pipe(filter(term => term!=""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => this.isLoading = true))
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .pipe(tap(() => this.isLoading = false))
      .subscribe(entries => this.foundEntries = entries);
  }
}
