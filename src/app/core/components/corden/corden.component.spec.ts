import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CordenComponent } from './corden.component';

describe('CordenComponent', () => {
  let component: CordenComponent;
  let fixture: ComponentFixture<CordenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CordenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
