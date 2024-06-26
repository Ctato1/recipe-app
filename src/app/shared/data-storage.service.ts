import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {catchError, map, tap, throwError} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-35b68-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe((responseRecipes) => {
      console.log(responseRecipes)
    })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-35b68-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
            return recipes.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
          }
        ),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        }),
        catchError(error => {
          return throwError(error.message)
        })
      )

  }
}
