import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliToastComponent } from './publi-toast.component';

describe('PubliToastComponent', () => {
  let component: PubliToastComponent;
  let fixture: ComponentFixture<PubliToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubliToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubliToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
