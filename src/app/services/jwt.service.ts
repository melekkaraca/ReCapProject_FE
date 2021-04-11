import { Injectable, NgModule } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { JwtDecodeOptions } from 'jwt-decode';
@NgModule()
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  options?:JwtDecodeOptions={
    header:true
  };
  constructor() { }

  DecodeToken(token: string): string {
    return jwt_decode.default(token,this.options);
    }
}
