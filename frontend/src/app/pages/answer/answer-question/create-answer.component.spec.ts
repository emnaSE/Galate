import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnswerComponent } from './create-answer.component';

describe('CreateClassComponent', () => {
  let component: CreateAnswerComponent;
  let fixture: ComponentFixture<CreateAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
