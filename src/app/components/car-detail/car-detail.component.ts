import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail: CarDetail;
  carImages: CarImage[] = [];
  carImageBasePath = "https://localhost:44332/";

  constructor(private activatedRoute:ActivatedRoute,
    private carService : CarService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if(param["carId"]){
        this.getCarDetailByCarId(param["carId"]);
      }

      this.getCarImageByCarId();
    });
    
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

}
