import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CordenxComponent } from './cordenx.component';

describe('CordenxComponent', () => {
  let component: CordenxComponent;
  let fixture: ComponentFixture<CordenxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CordenxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CordenxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
