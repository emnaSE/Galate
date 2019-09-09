import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectCriterionComponent } from './affectation-criterion.component';

describe('AffectSubcategorieComponent', () => {
  let component: AffectCriterionComponent;
  let fixture: ComponentFixture<AffectCriterionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectCriterionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
