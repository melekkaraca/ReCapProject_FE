import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  costumersPath = './costumers/all';
  carsPath='./cars/all';
  brandsPath='./brands/all';
  colorsPath='./colors/all';
  constructor() { }

  ngOnInit(): void {
  }

}
