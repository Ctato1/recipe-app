import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  // redirect to recipes if path is empty (pathMatch: 'full')
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  // ლაიზი ლოადის დამხმარე
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
]

@NgModule({
  // ააჩქაროს ჩატვირთვა ლაზი ლოადის დამხმარე
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
