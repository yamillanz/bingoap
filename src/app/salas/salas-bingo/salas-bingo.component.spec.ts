import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasBingoComponent } from './salas-bingo.component';

describe('SalasBingoComponent', () => {
  let component: SalasBingoComponent;
  let fixture: ComponentFixture<SalasBingoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalasBingoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasBingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
