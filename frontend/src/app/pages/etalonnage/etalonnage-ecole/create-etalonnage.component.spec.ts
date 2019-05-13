import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEtalonnageComponent } from './create-etalonnage.component';

describe('CreateClassComponent', () => {
  let component: CreateEtalonnageComponent;
  let fixture: ComponentFixture<CreateEtalonnageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEtalonnageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEtalonnageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
