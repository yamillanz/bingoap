import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartidaComponent } from './edit-partida.component';

describe('EditPartidaComponent', () => {
  let component: EditPartidaComponent;
  let fixture: ComponentFixture<EditPartidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
