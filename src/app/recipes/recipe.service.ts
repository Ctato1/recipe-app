import {Recipe} from "./recipe.model";

export class RecipeService {
  recipes: Recipe[] = [
    new Recipe("Test Recipe", 'This is TEST', 'https://www.eatingwell.com/thmb/zvHrm_Z8F2qLeJenpJ6lYodtq7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57831531-73819d8ce8f5413cac42cf1c907bc37a.jpg'),
    new Recipe("Second Test Recipe", 'This is Another test', 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574')
  ]

  getRecipe(): Recipe[] {
    return this.recipes.slice();
  }
}
