import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCategorieComponent } from './info-categorie.component';

describe('InfoCategorieComponent', () => {
  let component: InfoCategorieComponent;
  let fixture: ComponentFixture<InfoCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
