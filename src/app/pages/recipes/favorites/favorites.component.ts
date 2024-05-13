import { Component } from "@angular/core";
import { NavBarComponent } from "../../../components/navbar/navbar.component";

@Component({
    selector: 'recipe-favorites',
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css',
    standalone: true,
    imports: [NavBarComponent]
})
export class RecipePageFavorites {}