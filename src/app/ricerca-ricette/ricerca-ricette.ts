import { Component, OnInit, Signal, signal } from '@angular/core';
import { IngredientiCategorieService } from '../services/ingredienti-categorie.service';
import { CategoriaModel, IngredienteModel } from '../models/ingredienti.model';

@Component({
  selector: 'app-ricerca-ricette',
  imports: [],
  templateUrl: './ricerca-ricette.html',
  styleUrl: './ricerca-ricette.scss',
})
export class RicercaRicette implements OnInit {

  errorMessage= signal('');

  listCategorieIngredienti = signal<CategoriaModel[]>([]);

  listIngredientiSelected = signal<IngredienteModel[]>([]);

  metodo = signal('');

  constructor(private ingredientiCategorieService: IngredientiCategorieService) {}

  ngOnInit(): void {
    this.getCategorie();
  }

  getCategorie(): void {
    this.errorMessage.set('');
    this.listIngredientiSelected.set([]);

    this.ingredientiCategorieService.getCategorieConIngredienti().subscribe({
      next: (response) => {
        this.listCategorieIngredienti.set(response.categorie);
      },
      error: () => {
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
}
