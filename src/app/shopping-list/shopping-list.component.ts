import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients?: Observable<{ingredients:Ingredient[]}>;
  private igChangeSub!: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.changedIngredient.subscribe((ingredient: Ingredient[]): void => {
    //   this.ingredients = ingredient
    // })
  }

  ngOnDestroy() {
    // this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index)
  }

}
