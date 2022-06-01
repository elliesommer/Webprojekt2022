import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Entry} from "../shared/entry";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent{
  constructor(private router:Router, private route:ActivatedRoute) {
  }

  entrySelected(entry: Entry){
    this.router.navigate(['../entries', entry.id], {relativeTo: this.route});
  }
}
