import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Store} from "@ngrx/store";
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(private shoppingListService: ShoppingListService, private router: Router,
              private route: ActivatedRoute, private recipeService: RecipeService,
              private store:Store<{shoppingList:{ingredients:Ingredient[]}}>) {
  }

  ngOnInit() {
    this.recipe = this.route.snapshot.params['id']
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredients(ingredients))
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
    // this.router.navigate(['recipes', this.id, 'edit'])
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo: this.route})
  }


}
