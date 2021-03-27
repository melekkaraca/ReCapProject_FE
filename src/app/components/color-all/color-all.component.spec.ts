import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorAllComponent } from './color-all.component';

describe('ColorAllComponent', () => {
  let component: ColorAllComponent;
  let fixture: ComponentFixture<ColorAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
