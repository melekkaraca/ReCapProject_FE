import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  user:User=new User();
  costumersPath = './costumers/all';
  carsPath='./cars/all';
  brandsPath='./brands/all';
  colorsPath='./colors/all';
  constructor(
    private authService:AuthService,
    private  toastrService:ToastrService,
    private router:Router,
   // private jwtService:JwtService
    ) { }

  ngOnInit(): void {
  }
  checkToLogin(){
    if(this.authService.IsAuthhenticated()){
      console.log("true");
      return true;
    }else{
      console.log("false");
      return false;
    }
  }

  checkToEmail(){
    if(localStorage.getItem('email')){
      return true;
    }else{
      return false;
    }
  }
 
  logOut(){
   localStorage.removeItem("token"); //sorun var ilgilen
    this.toastrService.success("Çıkış Yapıldı");
    this.router.navigate(["/"])
  }
}
