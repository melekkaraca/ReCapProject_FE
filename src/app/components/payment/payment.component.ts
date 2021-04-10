import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm:FormGroup;
  constructor(
    private paymentService : PaymentService,
    private formBuilder : FormBuilder, 
    private toastrService:ToastrService,
  ) {}
  ngOnInit(): void {
    this.createRentForm();
  }
  createRentForm(){
    this.paymentForm = this.formBuilder.group({
      cardName:["", Validators.required],
      cardNumber:["", Validators.required],
      cardDateMonth:["", Validators.required],
      cardDateYear:["", Validators.required],
      cardCvv:["", Validators.required],
    })
  }
  createPayment()
  {
    if(this.paymentForm.valid){
      let paymentModel = Object.assign({},this.paymentForm.value)
      paymentModel.totalPrice=500;
      console.log(paymentModel);
      this.paymentService.pay(paymentModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        // if(responseError.error.length>0){
        //   for (let i = 0; i <responseError.error.Errors.length; i++) {
        //     this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
        //   }       
        // } 
        console.log(responseError);
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  }
}