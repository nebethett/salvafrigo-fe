import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CategorieConIngredientiResponse } from '../models/ingredienti.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientiCategorieService {
  private readonly apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getCategorieConIngredienti(): Observable<CategorieConIngredientiResponse> {
    return this.http.post<CategorieConIngredientiResponse>(
        `${this.apiUrl}/getCategorieConIngredienti`,
        null
    );
    }

}