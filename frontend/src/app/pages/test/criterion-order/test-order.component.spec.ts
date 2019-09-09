import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCriterionComponent } from './test-order.component';

describe('TestOrderComponent', () => {
  let component: TestCriterionComponent;
  let fixture: ComponentFixture<TestCriterionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCriterionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
