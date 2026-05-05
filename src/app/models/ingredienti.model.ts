export type IngredienteModel = {
  id: number;
  nome: string;
  quantita: number;
};

export type CategoriaModel = {
  id: number;
  nome: string;
  ingredienti: IngredienteModel[];
};

export type CategorieConIngredientiResponse = {
  categorie: CategoriaModel[];
};

export type CategorieConIngredientiRequest = {
  nome_ingrediente: string;
};

export interface RicettaPreview {
  id: number;
  titolo: string;
  sottotitolo: string;
  prep_minuti: number;
  cottura_minuti: number;
  porzioni: number;
  difficolta: 'Facile' | 'Media' | 'Difficile';
}

export interface IngredienteRicetta {
  nome: string;
  quantita: string;
}

export interface RicettaDettaglio extends RicettaPreview {
  ingredienti: IngredienteRicetta[];
  procedimento: string[];
  consiglio_chef: string;
}

export interface RicettaRequest {
  ingredienti: string;
  tipo: string;
}

export interface RicettaResponse {
  ricette: RicettaPreview[];
}