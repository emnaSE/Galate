import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubInfoComponent } from './sub-info.component';

describe('SubInfoComponent', () => {
  let component: SubInfoComponent;
  let fixture: ComponentFixture<SubInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
