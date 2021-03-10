import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPartidaComponent } from './nueva-partida.component';

describe('NuevaPartidaComponent', () => {
  let component: NuevaPartidaComponent;
  let fixture: ComponentFixture<NuevaPartidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPartidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
