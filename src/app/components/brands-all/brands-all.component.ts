import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-brands-all',
  templateUrl: './brands-all.component.html',
  styleUrls: ['./brands-all.component.css'],
})
export class BrandsAllComponent implements OnInit {
  brands: Brand[] = [];
  filterText = '';
  brandAddForm:FormGroup;
  brandUpdateForm:FormGroup;
  currentBrand : Brand ;
  currentBrandName:string;
  
  constructor(
    private formBuilder : FormBuilder, 
    private brandService:BrandService,
    private toastrService:ToastrService,
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.createBrandAddForm();
    this.createBrandUpdateForm();
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  setCurrentBrand(brand :Brand){
    this.currentBrand = brand;
    this.currentBrandName=brand.name;
  }
  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.getBrands();
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }       
        } 
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({},this.brandUpdateForm.value)
      brandModel.id=this.currentBrand.id;
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
        this.getBrands();
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }       
        } 
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
  delete(brand: Brand) {
    this.brandService.delete(brand).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Silindi'),
          this.getBrands();
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );
  }
  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      name:["", Validators.required]
    })
  }
  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      name:["", Validators.required],
    })
  }
}
 
