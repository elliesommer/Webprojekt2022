import { Component, OnInit, Input } from '@angular/core';
import { Entry } from "../shared/entry";

@Component({
  selector: 'a.bs-entry-list-item',
  templateUrl: './entry-list-item.component.html',
  styles: [
  ]
})
export class EntryListItemComponent implements OnInit {
  @Input() entry: Entry | undefined

  constructor() { }

  ngOnInit(): void {}

}
