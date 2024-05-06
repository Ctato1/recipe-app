import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENTS';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const GET_INGREDIENT = 'GET_INGREDIENT';


export class AddIngredient implements Action{
  readonly type= ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}
export class AddIngredients implements Action{
  readonly type= ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }
}

export class UpdateIngredient implements Action{
  readonly type= UPDATE_INGREDIENT;

  constructor(public payload: {index:number;ingredient:Ingredient}) {
  }
}
export class DeleteIngredients implements Action{
  readonly type= DELETE_INGREDIENT;

  constructor(public payload:number) {
  }
}

export class GetIngredients implements Action{
  readonly type= GET_INGREDIENTS;


}
export class GetIngredient implements Action{
  readonly type= GET_INGREDIENT;

  constructor(public index:number) {
  }
}
export type ShoppingListActions = AddIngredient | AddIngredients | UpdateIngredient | GetIngredient | DeleteIngredients | GetIngredients
