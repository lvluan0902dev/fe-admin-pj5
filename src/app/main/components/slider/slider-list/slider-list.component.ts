import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LazyLoadEvent } from 'primeng/api';
import { Slider } from 'src/app/main/models/slider/slider.model';
import { SliderService } from 'src/app/main/services/slider/slider.service';
import { environment } from 'src/environments/environment';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-slider-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.css']
})
export class SliderListComponent implements OnInit {
  public url = environment.url + '/';
  public sliders: Slider[] = [];
  public totalResult: number = 0;
  public total: number = 0;
  public loading: boolean = true;
  public event: any;
  public search_input: string = '';

  constructor(
    private sliderService: SliderService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) {
    this.title.setTitle('Danh sách Slider');
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
        this.totalResult = response.total_result;
        this.total = response.total;
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
      this.totalResult = response.total_result;
      this.total = response.total;
      this.loading = false;
    })
  }

  public delete(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xoá?',
      header: 'Xoá',
      icon: 'pi pi-info-circle',
      accept: () => {
        
      },
      reject: () => {

      },
      key: "positionDialog"
    });
  }
}
