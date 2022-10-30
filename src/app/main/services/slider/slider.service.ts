import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(
    private httpService: HttpService
  ) { }

  public list() {
    
  }
}
