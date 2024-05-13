import { Component } from "@angular/core";
import { AdminNavBarComponent } from "../../components/navbar/navbar.component";
import { Router, RouterModule } from "@angular/router";
import { AdminRecipeEdit } from "./edit/edit.component";

@Component({
    selector: 'admin-user',
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
    standalone: true,
    imports: [AdminNavBarComponent, RouterModule]
})
export class AdminRecipeComponent {

    constructor(private router: Router) {}

    onEditRecipe() {
        this.router.navigate(['/admin/recipes/edit']);
    }
}