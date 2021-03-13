import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44332/api/cars/GetAllCarDetail";
  
  constructor(private httpClient:HttpClient) { }
  
  getCarDetails() : Observable<ListResponseModel<CarDetail>> {
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl); 
  }
}
