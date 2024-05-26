import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { NavBarComponent } from '../../components/navbar/navbar.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

const FILTER_BY_CATEGORY = 'Filter by category';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [CommonModule, CardsComponent, NavBarComponent, FormsModule],
  providers: [RecipeService],
})
export class HomePage implements OnInit {
  public recipeList: Recipe[] = [];
  public isUserLogged: boolean = false;
  public categories: string[] = ['Fish', 'Meat', 'Vegetarian', 'Dessert'];
  public searchByNameField!: string;
  public selectedCategoryByName: string = 'Filter by category';

  constructor(
    private readonly recipeService: RecipeService,
    private router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getRecipe();
    this.getUserLoggedStatus();
  }

  private getUserLoggedStatus(): void {
    this.authService.isLogged.subscribe(
      (logged) => (this.isUserLogged = logged)
    );
  }

  private getRecipe(): void {
    this.recipeService.getRecipes().subscribe((response) => {
      console.log('Recipe from Home: ', response);
      this.recipeList = response.filter((recipe) => recipe.isValid);
    });
  }

  onCreate(): void {
    this.router.navigate(['/recipe/add']);
  }

  onFilterByCategory(event: any): void {
    const hasCategory = this.categories.find(
      (category) => category == event.target.value
    );
    if (hasCategory != null) {
      this.recipeList = this.recipeList.filter(
        (elem) => elem.category === event.target.value
      );
    } else {
      this.selectedCategoryByName = FILTER_BY_CATEGORY;
      this.recipeList = [];
      this.getRecipe();
    }
  }

  onSearchByName(): void {
    this.recipeList = this.recipeList.filter((elem) =>
      elem.name.includes(this.searchByNameField)
    );
  }

  onClear(): void {
    this.selectedCategoryByName = FILTER_BY_CATEGORY;
    this.recipeList = [];
    this.searchByNameField = '';
    this.getRecipe();
  }
}
