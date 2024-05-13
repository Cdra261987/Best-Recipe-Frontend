import { Component } from "@angular/core";
import { NavBarComponent } from "../../../components/navbar/navbar.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'recipe-favorites',
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css',
    standalone: true,
    imports: [CommonModule, NavBarComponent]
})
export class RecipePageFavorites {}