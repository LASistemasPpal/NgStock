import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosturasSiopelComponent } from './posturas-siopel.component';

describe('PosturasSiopelComponent', () => {
  let component: PosturasSiopelComponent;
  let fixture: ComponentFixture<PosturasSiopelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosturasSiopelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosturasSiopelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
