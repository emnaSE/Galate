import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEcoleComponent } from './create-ecole.component';

describe('CreateClassComponent', () => {
  let component: CreateEcoleComponent;
  let fixture: ComponentFixture<CreateEcoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEcoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEcoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
