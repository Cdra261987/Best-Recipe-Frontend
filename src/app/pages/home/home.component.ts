import { Component, OnInit } from "@angular/core";
import { CardsComponent } from "../../components/cards/cards.component";
import { NavBarComponent } from "../../components/navbar/navbar.component";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../models/recipe";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: true,
    imports: [CommonModule, CardsComponent, NavBarComponent],
    providers: [RecipeService]
})

export class HomePage implements OnInit {

    public recipeList: Recipe[] = [];

    constructor(private readonly recipeService: RecipeService, private router: Router) {}

    ngOnInit(): void {
        this.getRecipe();
    }

    private getRecipe(): void {
        this.recipeService.getRecipes().subscribe((response) => {
            console.log("Recipe from Home: ", response);
            this.recipeList = response;
        });
    }

    onCreate(): void {
        this.router.navigate(['/recipe/add']);
    }
}