import { Component, OnInit } from "@angular/core";
import { NavBarComponent } from "../../../components/navbar/navbar.component";
import { CommentsComponent } from "../../../components/comments/comments.component";
import { RatingsComponent } from "../../../components/ratings/ratings.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "../../../models/recipe";
import { RecipeService } from "../../../services/recipe.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'recipe-details',
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
    standalone: true,
    imports: [CommonModule, NavBarComponent, CommentsComponent, RatingsComponent]
})
export class RecipePageDetails implements OnInit {

    private recipeId!: number;
    public recipe!: Recipe;

    constructor(private activateRouter: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

    public ngOnInit(): void {
        this.activateRouter.params.subscribe((params) => {
            console.log(params);
            this.recipeId = params["id"];
            this.getRecipe();
        });
    }

    private getRecipe(): void {
        this.recipeService.getRecipeById(this.recipeId).subscribe((response) => {
            console.log(response);
            this.recipe = response;
        })
    }

    public onEdit(): void {
        this.router.navigate(['/recipe/edit/' + this.recipeId]);
    }
}