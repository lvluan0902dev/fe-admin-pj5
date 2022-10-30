import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Slider } from 'src/app/main/models/slider/slider.model';
import { SliderService } from 'src/app/main/services/slider/slider.service';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.css']
})
export class SliderListComponent implements OnInit {
  sliders: Slider[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  event: any;
  search_input: string = '';

  constructor(
    private sliderService: SliderService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    let data = {
      first_row: 0,
      per_page: 10
    }
    this.sliderService.list(data).subscribe(response => {
      this.sliders = response.data;
      this.totalRecords = response.total_result;
      this.loading = false;
    })
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    this.event = event;
    this.event.searchInput = this.search_input;
    setTimeout(() => {
      this.sliderService.list(this.event).subscribe(response => {
        this.sliders = response.data;
        this.totalRecords = response.total_result;
        this.loading = false;
      })
    }, 1000);
  }

  search(value: string) {
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
