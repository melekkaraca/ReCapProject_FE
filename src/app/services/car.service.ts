import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44332/api/";
  
  constructor(private httpClient:HttpClient) { }
  
  getCarDetails() : Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/GetAllCarDetail";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath); 
  }
  getCarDetailsByBrandId(brandId:number) : Observable<ListResponseModel<CarDetail>> {
    let newpath = this.apiUrl + "cars/GetAllCarDetailByBrandId?id="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newpath); 
  }
  getCarDetailsByColorId(colorId:number) : Observable<ListResponseModel<CarDetail>> {
    let newpath = this.apiUrl + "cars/GetAllCarDetailsByColorId?id="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newpath); 
  }
}
