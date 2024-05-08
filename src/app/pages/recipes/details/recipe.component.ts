import { Component } from "@angular/core";
import { NavBarComponent } from "../../../components/navbar/navbar.component";

@Component({
    selector: 'recipe-details',
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
    standalone: true,
    imports: [NavBarComponent]
})
export class RecipePageDetails {}