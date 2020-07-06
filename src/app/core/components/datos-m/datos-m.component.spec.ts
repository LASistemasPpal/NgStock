import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMComponent } from './datos-m.component';

describe('DatosMComponent', () => {
  let component: DatosMComponent;
  let fixture: ComponentFixture<DatosMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
