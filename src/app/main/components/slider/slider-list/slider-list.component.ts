import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.css']
})
export class SliderListComponent implements OnInit {
  customers= [];

  first = 0;

  rows = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
