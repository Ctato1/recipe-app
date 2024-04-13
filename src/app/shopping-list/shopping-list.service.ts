import {Subject} from "rxjs";
import {Ingredient} from "../shared/ingredient.model";


export class ShoppingListService {
  changedIngredient = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>()
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Peanut', 9)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.changedIngredient.next(this.ingredients.slice());
  }

  addRecipeIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    // this.changedIngredient.emit(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.changedIngredient.next(this.ingredients.slice());
  }
}
