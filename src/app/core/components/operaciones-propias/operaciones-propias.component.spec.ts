import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesPropiasComponent } from './operaciones-propias.component';

describe('OperacionesPropiasComponent', () => {
  let component: OperacionesPropiasComponent;
  let fixture: ComponentFixture<OperacionesPropiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacionesPropiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionesPropiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
