import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

import {AuthComponent} from "./auth/auth.component";


const routes: Routes = [
  // redirect to recipes if path is empty (pathMatch: 'full')
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: ()=> import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'shopping-list', loadChildren: ()=> import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
