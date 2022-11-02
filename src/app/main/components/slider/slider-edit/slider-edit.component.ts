import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slider-edit',
  templateUrl: './slider-edit.component.html',
  styleUrls: ['./slider-edit.component.css']
})
export class SliderEditComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title
  ) {
    this.title.setTitle('Sửa slider');
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

}
