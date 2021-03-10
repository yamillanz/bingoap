import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaNuevaComponent } from './sala-nueva.component';

describe('SalaNuevaComponent', () => {
  let component: SalaNuevaComponent;
  let fixture: ComponentFixture<SalaNuevaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaNuevaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
