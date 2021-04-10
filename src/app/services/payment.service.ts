import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentDto } from '../models/paymentDto';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44332/api/payments/";
  constructor(private httpClient:HttpClient) { }

  pay(paymentDto:PaymentDto):Observable<ResponseModel>{
    console.log(paymentDto);
    return this.httpClient.post<ResponseModel>(this.apiUrl + "pay",paymentDto);
    
  }
}
