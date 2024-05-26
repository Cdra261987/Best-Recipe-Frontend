import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { Recipe } from "../models/recipe";


@Injectable({ providedIn: 'root'})
export class RecipeService {
    constructor(private readonly http: HttpClient) {}

    private readonly recipeUrl = 'Recipe';
    private readonly httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(environment.apiUrl + this.recipeUrl);
    }

    postRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(environment.apiUrl + this.recipeUrl, recipe, this.httpOptions);
    } 

    getRecipeById(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(environment.apiUrl + this.recipeUrl + `/${id}`);
    }

    deleteRecipe(id: number): Observable<void> {
        return this.http.delete<void>(environment.apiUrl + this.recipeUrl + `/${id}`);
    }
}