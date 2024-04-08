import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients!: Ingredient[];
  private igChangeSub!: Subscription;
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.changedIngredient.subscribe((ingredient: Ingredient[]): void => {
      this.ingredients = ingredient
    })
  }
  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }

}
