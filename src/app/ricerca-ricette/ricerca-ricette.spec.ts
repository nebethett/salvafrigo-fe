import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaRicette } from './ricerca-ricette';

describe('RicercaRicette', () => {
  let component: RicercaRicette;
  let fixture: ComponentFixture<RicercaRicette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RicercaRicette],
    }).compileComponents();

    fixture = TestBed.createComponent(RicercaRicette);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
