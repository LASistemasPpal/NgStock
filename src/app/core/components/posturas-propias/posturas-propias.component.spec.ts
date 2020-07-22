import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosturasPropiasComponent } from './posturas-propias.component';

describe('PosturasPropiasComponent', () => {
  let component: PosturasPropiasComponent;
  let fixture: ComponentFixture<PosturasPropiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosturasPropiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosturasPropiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
