import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  carDetails:CarDetail[] = [];
  dataLoaded=false;
  currentCar : CarDetail ;
  constructor(private carService : CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"])
      {
        this.getCarDetailsByBrandId(params["brandId"])
      }else if(params["colorId"])
      {
        this.getCarDetailsByColorId(params["colorId"])
      }else if(params["carId"])
      {
        console.log(params["carId"]);
      }
      else
      {
        this.getCarDetails();
      }
    })
  }
  getCarDetails()
  {
    this.carService.getCarDetails().subscribe(response=>{
      this.carDetails = response.data,
      this.dataLoaded = true;
    })
  }
  getCarDetailsByBrandId(branId:number)
  {
    this.carService.getCarDetailsByBrandId(branId).subscribe(response=>{
      this.carDetails = response.data,
      this.dataLoaded = true;
    })
  }
  getCarDetailsByColorId(colorId:number)
  {
    this.carService.getCarDetailsByColorId(colorId).subscribe(response=>{
      this.carDetails = response.data,
      this.dataLoaded = true;
    })
  }
  setCurrentCar(car :CarDetail){
    this.currentCar = car;
  }
}
