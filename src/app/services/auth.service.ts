import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { Register } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl="https://localhost:44332/api/auth/";
  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel)
  {
    let newpath = this.apiUrl + "login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newpath,loginModel);

  }

  IsAuthhenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
  register(register:Register)
  {
    let newpath = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newpath,register);

  }
}
