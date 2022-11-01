import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/api';
import { Slider } from 'src/app/main/models/slider/slider.model';
import { SliderService } from 'src/app/main/services/slider/slider.service';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.css']
})
export class SliderListComponent implements OnInit {
  public sliders: Slider[] = [];
  public totalRecords: number = 0;
  public loading: boolean = true;
  public event: any;
  public search_input: string = '';

  constructor(
    private sliderService: SliderService,
    private title: Title
  ) {
    this.title.setTitle('Slider list');
  }

  ngOnInit(): void {
    this.loading = true;
  }

  public loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    this.event = event;
    this.event.searchInput = this.search_input;
    setTimeout(() => {
      this.sliderService.list(this.event).subscribe((response) => {
        this.sliders = response.data;
        this.totalRecords = response.total_result;
        this.loading = false;
      })
    }, 1000);
  }

  public search(value: string) {
    this.loading = true;
    this.search_input = value;
    this.event.searchInput = this.search_input;
    this.sliderService.list(this.event).subscribe(response => {
      this.sliders = response.data;
      this.totalRecords = response.total_result;
      this.loading = false;
    })
  }
}
