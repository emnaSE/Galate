import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOrderCriterionComponent } from './add-order.component';



describe('AddOrderComponent', () => {
  let component: AddOrderCriterionComponent;
  let fixture: ComponentFixture<AddOrderCriterionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderCriterionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
