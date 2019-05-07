import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSousComponent } from './create-sous.component';

describe('CreateSousComponent', () => {
  let component: CreateSousComponent;
  let fixture: ComponentFixture<CreateSousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
