import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params} from "@angular/router";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  recipe!: Recipe;
  id!: number;

  constructor(private shoppingListService: ShoppingListService,private route:ActivatedRoute,private recipeService:RecipeService) {
  }

  ngOnInit() {
    this.recipe = this.route.snapshot.params['id']
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.shoppingListService.addIngredients(ingredient);
    // }
    this.shoppingListService.addRecipeIngredients(ingredients)
  }


}
