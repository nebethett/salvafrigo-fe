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