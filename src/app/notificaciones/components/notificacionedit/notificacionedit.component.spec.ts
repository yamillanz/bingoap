import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacioneditComponent } from './notificacionedit.component';

describe('NotificacioneditComponent', () => {
  let component: NotificacioneditComponent;
  let fixture: ComponentFixture<NotificacioneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacioneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
