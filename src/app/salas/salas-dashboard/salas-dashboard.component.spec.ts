import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasDashboardComponent } from './salas-dashboard.component';

describe('SalasDashboardComponent', () => {
  let component: SalasDashboardComponent;
  let fixture: ComponentFixture<SalasDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalasDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
