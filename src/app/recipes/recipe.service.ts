import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "Test Recipe",
      'This is a TEST',
      'https://www.eatingwell.com/thmb/zvHrm_Z8F2qLeJenpJ6lYodtq7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57831531-73819d8ce8f5413cac42cf1c907bc37a.jpg',
      [
        new Ingredient('Meat', 5),
        new Ingredient('Bean', 20)]),
    new Recipe(
      "Test Recipe",
      'This is a Second TEST',
      'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Pork', 1),]),
  ]

  getRecipe(): Recipe[] {
    return this.recipes.slice();
  }
}
