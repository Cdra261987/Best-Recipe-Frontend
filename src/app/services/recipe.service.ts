import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { Recipe } from "../models/recipe";


@Injectable({ providedIn: 'root'})
export class RecipeService {
    constructor(private readonly http: HttpClient) {}

    private readonly recipeUrl = 'Recipe'

    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(environment.apiUrl + this.recipeUrl);
    }

    //postRecipe(): 
}