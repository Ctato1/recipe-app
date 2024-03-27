import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";


export class ShoppingListService {
  changedIngredient: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Peanut', 9)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }


  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.changedIngredient.emit(this.ingredients.slice());
  }
}
