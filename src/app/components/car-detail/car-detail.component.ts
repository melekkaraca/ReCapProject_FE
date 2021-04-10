import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { RouterModule,ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})

export class CarDetailComponent implements OnInit {
  carDetail: CarDetail;
  carImages: CarImage[] = [];
  rentForm:FormGroup;
  title = 'appBootstrap';
  model:'';
  apiUrl = "https://localhost:44332/";
  paymentUrl: '~/src/app/components/payment/payment.component.html';
  templateUrl:'src/app/components/todo/todo.html';
  constructor(
    private activatedRoute:ActivatedRoute,
    private carService : CarService,
    private formBuilder : FormBuilder, 
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if(param["carId"]){
        this.getCarDetailByCarId(param["carId"]);
      }
      this.getCarImageByCarId();
      
    });
    this.createRentForm();
    
  }
  getCarDetailByCarId(carId:number)
  {
    this.carService.getCarDetailByCarId(carId)
    .subscribe(response=>{
      this.carDetail = response.data[0],
      console.log(this.carDetail);
    })
  }
  getCarImageByCarId(){
    this.carService.getCarImagesByCarId(this.activatedRoute.snapshot.params["carId"])
      .subscribe((response) => {
        this.carImages = response.data;
        console.log(this.carImages);
      });
  }
  sliderItemActive(index: number){
    if(index === 0){
      return "carousel-item active";
    }
    else{
      return "carousel-item";
    }
  }
  createRentForm(){
    this.rentForm = this.formBuilder.group({
      startDate:["", Validators.required],
      endDate:["", Validators.required],
    })
  }
  rent()
  {
    if(this.rentForm.valid){
      let rentModel = Object.assign({},this.rentForm.value)
      console.log(rentModel);
      rentModel.carId=this.carDetail.carId;
      rentModel.customerId=1;
      this.rentalService.rent(rentModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        console.log("Kiralanabilir");
        this.goPayment();
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }       
        } 
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat");
    }
  } 
  goPayment() {
    this.toastrService.info('Ödeme noktasına yönlendiriliyorsunuz...');
    this.router.navigate(['/payment/' + this.carDetail.carId]);
  }

}