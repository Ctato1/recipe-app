import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import * as ShoppingListActions from '../store/shopping-list.actions'
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {Store} from "@ngrx/store";
import {AddIngredient, UpdateIngredient} from "../store/shopping-list.actions";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm!: NgForm;

  subscription!: Subscription
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService,private store : Store<{shoppingList: {ingredients: Ingredient[]}}>){
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index)
        // @ts-ignore
        this.slForm.setValue({
          "name": this.editedItem.name,
          "amount": this.editedItem.amount,
        })
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    if (!value.name.trim() && value.amount.trim()) return;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index:this.editedItemIndex, ingredient:newIngredient}))
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredients(this.editedItemIndex))
    // this.store.dispatch(new ShoppingListActions.GetIngredients())
    this.onClear();
  }
}
