import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MybingoComponent } from './mybingo.component';

describe('MybingoComponent', () => {
  let component: MybingoComponent;
  let fixture: ComponentFixture<MybingoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybingoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MybingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
