import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

import {AuthComponent} from "./auth/auth.component";


const routes: Routes = [
  // redirect to recipes if path is empty (pathMatch: 'full')
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: ()=> import('./recipes/recipes.module').then(m => m.RecipesModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
