import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CategorieConIngredientiRequest, CategorieConIngredientiResponse, RicettaDettaglio, RicettaRequest, RicettaResponse } from '../models/ingredienti.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientiCategorieService {
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getCategorieConIngredienti(input : CategorieConIngredientiRequest): Observable<CategorieConIngredientiResponse> {
    return this.http.post<CategorieConIngredientiResponse>(
        `${this.apiUrl}/getCategorieConIngredienti`,
        input
    );
  }

  generaRicetta(input : RicettaRequest): Observable<CategorieConIngredientiResponse> {
    return this.http.post<CategorieConIngredientiResponse>(
        `${this.apiUrl}/getCategorieConIngredienti`,
        input
    );
  }

  getRicette(input: RicettaRequest) {
    return this.http.post<RicettaResponse>(
      `${this.apiUrl}/ricette`,
      input
    );
  }

  getDettaglioRicetta(input: {
    titolo: string;
    ingredienti: string;
    tipo: string;
  }) {
    return this.http.post<RicettaDettaglio>(
      `${this.apiUrl}/ricette/dettaglio`,
      input
    );
  }

}