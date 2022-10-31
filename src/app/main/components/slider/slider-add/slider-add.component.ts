import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.css']
})
export class SliderAddComponent implements OnInit {
  public form = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    link: ['', [Validators.required]],
    image: ['', [Validators.required]],
    status: ['', []],
  })

  constructor(
    private title: Title,
    private fb: FormBuilder
  ) {
    this.title.setTitle('Slider  add');
  }

  ngOnInit(): void {
  }

  public save() {
    console.log(this.form);
    
  }
}
