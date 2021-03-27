import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsAllComponent } from './brands-all.component';

describe('BrandsAllComponent', () => {
  let component: BrandsAllComponent;
  let fixture: ComponentFixture<BrandsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
