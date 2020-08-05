import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgoLiquidezComponent } from './riesgo-liquidez.component';

describe('RiesgoLiquidezComponent', () => {
  let component: RiesgoLiquidezComponent;
  let fixture: ComponentFixture<RiesgoLiquidezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiesgoLiquidezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiesgoLiquidezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
