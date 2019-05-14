import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectCategorieComponent } from './affect-categorie.component';

describe('AffectCategorieComponent', () => {
  let component: AffectCategorieComponent;
  let fixture: ComponentFixture<AffectCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
