import { Component, OnInit } from '@angular/core';
import { AdminNavBarComponent } from './components/navbar/navbar.component';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: true,
  imports: [AdminNavBarComponent, CommonModule],
})
export class AdminComponent implements OnInit {
  public recipeList!: Recipe[];
  public userList!: User[];

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getRecipe();
  }

  private getUser(): void {
    this.userService.getUsers().subscribe((response) => {
      this.userList = response;
    });
  }

  private getRecipe(): void {
    this.recipeService.getRecipes().subscribe((response) => {
      this.recipeList = response;
    });
  }

  onLoadUsers(): void {
    this.router.navigate(['/admin/users']);
  }

  onLoadRecipes(): void {
    this.router.navigate(['/admin/recipes']);
  }
}
