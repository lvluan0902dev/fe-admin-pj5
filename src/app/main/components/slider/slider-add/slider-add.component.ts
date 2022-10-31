import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.css']
})
export class SliderAddComponent implements OnInit {

  constructor(
    private title: Title
  ) {
    this.title.setTitle('Slider  add');
  }

  ngOnInit(): void {
  }

}
