import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  carDetails:CarDetail[] = [];
  dataLoaded=false;
  currentCar : CarDetail ;
  filterText="";
  brands :Brand[] = [];
  colors : Color[] = [];
  constructor(private carService : CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService) { }

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
    this.getBrands();
    this.getColors();
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
  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }
}
