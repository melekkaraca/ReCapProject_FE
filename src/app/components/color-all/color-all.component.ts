import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-color-all',
  templateUrl: './color-all.component.html',
  styleUrls: ['./color-all.component.css'],
})
export class ColorAllComponent implements OnInit {
  colors: Color[] = [];
  filterText = '';
  colorAddForm:FormGroup;
  colorUpdateForm:FormGroup;
  currentColor : Color ;
  currentColorName:string;
  
  constructor(
    private formBuilder : FormBuilder, 
    private colorService: ColorService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.createColorAddForm();
    this.createColorUpdateForm();
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  setCurrentColor(color :Color){
    this.currentColor = color;
    this.currentColorName=color.name;
  }
  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.getColors();
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
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({},this.colorUpdateForm.value)
      colorModel.id=this.currentColor.id;
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı");
        this.getColors();
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
  delete(color: Color) {
    this.colorService.delete(color).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Silindi'),
          this.getColors();
      },
      (responseError) => {
        this.toastrService.error(responseError.error);
      }
    );
  }
  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      name:["", Validators.required]
    })
  }
  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      name:["", Validators.required],
    })
  }
}
 
