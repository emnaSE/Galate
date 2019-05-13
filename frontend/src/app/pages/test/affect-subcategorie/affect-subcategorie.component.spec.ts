import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectSubcategorieComponent } from './affect-subcategorie.component';

describe('AffectSubcategorieComponent', () => {
  let component: AffectSubcategorieComponent;
  let fixture: ComponentFixture<AffectSubcategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectSubcategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectSubcategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
