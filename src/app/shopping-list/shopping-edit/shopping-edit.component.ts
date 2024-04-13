import {Component} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {

  constructor(private shoppingListService: ShoppingListService) {
  }

  onAddItem(form: NgForm): void {
    console.log(form.value)
    const value = form.value;
    if (!value.name.trim() && value.amount.trim()) return;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredients(newIngredient)
  }

}
