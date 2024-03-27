import {Component, Input} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  @Input() recipe!: Recipe;

  constructor(private shoppingListService: ShoppingListService) {
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.shoppingListService.addIngredients(ingredient);
    // }
    this.shoppingListService.addRecipeIngredients(ingredients)
  }


}
