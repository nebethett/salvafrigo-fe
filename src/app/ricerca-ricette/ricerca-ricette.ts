import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { IngredientiCategorieService } from '../services/ingredienti-categorie.service';
import { CategoriaModel, CategorieConIngredientiRequest, IngredienteModel, RicettaDettaglio, RicettaPreview, RicettaRequest } from '../models/ingredienti.model';
import { LoadingService } from '../core/services/loading';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ricerca-ricette',
  imports: [NgClass, FormsModule],
  templateUrl: './ricerca-ricette.html',
  styleUrl: './ricerca-ricette.scss',
})
export class RicercaRicette implements OnInit {

  private readonly loadingService = inject(LoadingService);

  errorMessage= signal('');

  listCategorieIngredienti = signal<CategoriaModel[]>([]);

  listIngredientiSelected = signal<IngredienteModel[]>([]);

  metodo = signal('');

  ingredienteName = signal('');

  ricette = signal<RicettaPreview[]>([]);
  ricettaDettaglio = signal<RicettaDettaglio | null>(null);

  constructor(private ingredientiCategorieService: IngredientiCategorieService) {}

  ngOnInit(): void {
    this.getCategorie();
  }

  getCategorie(): void {
    this.errorMessage.set('');
    var input : CategorieConIngredientiRequest = {nome_ingrediente: this.ingredienteName()};
    this.loadingService.show();

    this.ingredientiCategorieService.getCategorieConIngredienti(input).subscribe({
      next: (response) => {
        this.loadingService.hide();
        this.listCategorieIngredienti.set(response.categorie);
      },
      error: () => {
        this.loadingService.hide();
        this.errorMessage.set('Si è verificato un errore.');
      }
    });
  }

  cercaIngrediente(): void {
    this.errorMessage.set('');
    var input : CategorieConIngredientiRequest = {nome_ingrediente: this.ingredienteName()};
    this.loadingService.show();

    this.ingredientiCategorieService.getCategorieConIngredienti(input).subscribe({
      next: (response) => {
        this.loadingService.hide();
        this.listCategorieIngredienti.set(response.categorie);
      },
      error: () => {
        this.loadingService.hide();
        this.errorMessage.set('Si è verificato un errore.');
      }
    });
  }

  addIngrediente(ingrediente: IngredienteModel): void {
    this.listIngredientiSelected.update(lista => {
      const exists = lista.some(item => item.id === ingrediente.id);

      if (exists) {
        return lista;
      }

      return [...lista, ingrediente];
    });
  }

  removeIngrediente(id: number): void {
    this.listIngredientiSelected.update(lista =>
      lista.filter(item => item.id !== id)
    );
  }

  isIngredienteSelected(id: number): boolean {
    return this.listIngredientiSelected().some(
      ingrediente => ingrediente.id === id
    );
  }

  selectMethod(method: string): void {
    this.metodo.set(method);
  }

  cercaRicette(): void {
    this.errorMessage.set('');
    this.ricettaDettaglio.set(null);
    this.loadingService.show();

    const input: RicettaRequest = {
      ingredienti: this.listIngredientiSelected().map(e => e.nome.replace(/\s/g, "")).join(","),
      tipo: this.metodo()
    };

    this.ingredientiCategorieService.getRicette(input).subscribe({
      next: (response) => {
        this.ricette.set(response.ricette);
        this.loadingService.hide();
      },
      error: () => {
        this.errorMessage.set('Errore nella generazione delle ricette.');
        this.loadingService.hide();
      }
    });
  }

  apriRicetta(ricetta: RicettaPreview): void {
    this.errorMessage.set('');
    this.loadingService.show();

    const input = {
      titolo: ricetta.titolo,
      ingredienti: this.listIngredientiSelected().map(e => e.nome.replace(/\s/g, "")).join(","),
      tipo: this.metodo()
    };

    this.ingredientiCategorieService.getDettaglioRicetta(input).subscribe({
      next: (response) => {
        this.ricettaDettaglio.set(response);
        this.loadingService.hide();
      },
      error: () => {
        this.errorMessage.set('Errore nel dettaglio della ricetta.');
        this.loadingService.hide();
      }
    });
  }

  tornaAlleCard(): void {
    this.ricettaDettaglio.set(null);
  }
}
