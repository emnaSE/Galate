import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicationComponent } from './duplication.component';

describe('DuplicationComponent', () => {
  let component: DuplicationComponent;
  let fixture: ComponentFixture<DuplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
