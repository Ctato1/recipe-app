import {Ingredient} from "../../shared/ingredient.model";

import * as ShoppingListActions from './shopping-list.actions'

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Peanut', 9)
  ]
}
// updateIngredient(index: number, newIngredient: Ingredient) {
//   this.ingredients[index] = newIngredient;
//   this.changedIngredient.next(this.ingredients.slice());
// }
export function ShoppingListReducer(state = initialState,action:ShoppingListActions.ShoppingListActions) {
    switch (action.type){
      case ShoppingListActions.ADD_INGREDIENT:
        return {
          ...state,
         ingredients: [
           ...state.ingredients,
           action.payload
         ]
        }
      case ShoppingListActions.ADD_INGREDIENTS:
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            ...action.payload
          ]
        }
      case ShoppingListActions.UPDATE_INGREDIENT:
        const ingredient = state.ingredients[action.payload.index];
        const updatedIngredient = {
          ...ingredient,
          ...action.payload.ingredient
        }
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.payload.index] = updatedIngredient
        return {
          ...state,
          ingredients:updatedIngredients
        }
      case ShoppingListActions.DELETE_INGREDIENT:

        return {
          ...state,
          ingredients: state.ingredients.filter((ingredient,index)=>{
            return index !== action.payload
          })
        }

      default:
        return state
    }

}
