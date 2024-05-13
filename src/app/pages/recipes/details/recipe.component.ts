import { Component } from "@angular/core";
import { NavBarComponent } from "../../../components/navbar/navbar.component";
import { CommentsComponent } from "../../../components/comments/comments.component";
import { RatingsComponent } from "../../../components/ratings/ratings.component";

@Component({
    selector: 'recipe-details',
    templateUrl: './recipe.component.html',
    styleUrl: './recipe.component.css',
    standalone: true,
    imports: [NavBarComponent, CommentsComponent, RatingsComponent]
})
export class RecipePageDetails {}