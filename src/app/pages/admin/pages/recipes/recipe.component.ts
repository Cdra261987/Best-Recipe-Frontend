import { Component, OnInit } from "@angular/core";
import { AdminNavBarComponent } from "../../components/navbar/navbar.component";
import { Router, RouterModule } from "@angular/router";
import { AdminRecipeEdit } from "./edit/edit.component";
import { RecipeService } from "../../../../services/recipe.service";
import { Recipe } from "../../../../models/recipe";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: 'admin-user',
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
    standalone: true,
    imports: [AdminNavBarComponent, RouterModule, CommonModule]
})
export class AdminRecipeComponent implements OnInit {

    public recipeList!: Recipe[];

    constructor(private router: Router, private recipeService: RecipeService, private toastrService: ToastrService) {}

    ngOnInit(): void {
        this.getRecipe();
    }

    private getRecipe(): void {
        this.recipeService.getRecipes().subscribe((response) => {
            this.recipeList = response;
        })
    }

    onEditRecipe(id: number) {
        this.router.navigate(['/admin/recipes/edit/' + id]);
    }

    onValidRecipe(id: number) {
        this.recipeService.getRecipeById(id).subscribe((response) => {
            const recipe: Recipe = response;
            recipe.isValid = true;

            this.recipeService.postRecipe(recipe).subscribe((response) => {
                if(response != null) {
                    this.toastrService.success('Recipe updated successfully!', 'Success');
                    this.getRecipe();
                } else {
                    this.toastrService.error('An error occurred!', 'Error');
                }
            })
        });
    }

    onDeleteRecipe(id: number) {
        this.recipeService.deleteRecipe(id).subscribe((_) => {
            this.getRecipe();
            this.toastrService.success('Recipe deleted successfully!', 'Success');
        }, err => {
            this.toastrService.error('An error occurred!', 'Error');
        })
    }
}