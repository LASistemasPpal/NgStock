import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicionMAntComponent } from './posicion-m-ant.component';

describe('PosicionMAntComponent', () => {
  let component: PosicionMAntComponent;
  let fixture: ComponentFixture<PosicionMAntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosicionMAntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicionMAntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
