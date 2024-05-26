import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminNavBarComponent } from '../../../components/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../../../services/recipe.service';
import { Recipe } from '../../../../../models/recipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'recipe-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AdminNavBarComponent],
})
export class AdminRecipeEdit implements OnInit {
  formRecipe!: FormGroup;
  private recipeId!: number;
  private recipe!: Recipe;

  constructor(
    private fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private recipeService: RecipeService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      this.recipeId = params['id'];
      if (this.recipeId != null) {
        this.getRecipeById();
      }
    });
  }

  private getRecipeById(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe((response) => {
      this.recipe = response;
      this.initForm();
    });
  }

  private initForm(): void {
    this.formRecipe = this.fb.group({
      name: new FormControl(this.recipe.name || '', [Validators.required]),
      description: new FormControl(this.recipe.description || '', [
        Validators.required,
      ]),
      duration: new FormControl(this.recipe.duration || 0, [
        Validators.required,
      ]),
      difficulty: new FormControl(this.recipe.difficulty || 0, [
        Validators.required,
      ]),
      category: new FormControl(this.recipe.category || '', [
        Validators.required,
      ]),
    });
  }

  onEdit(): void {

    this.recipe = {
        ...this.recipe,
        ...this.formRecipe.value
    }

    this.recipeService.postRecipe(this.recipe).subscribe((response) => {
        console.log(response);
        if (response != null) {
          this.toastrService.success(
            'Recipe edited successfully!',
            'Success'
          );
          this.router.navigate(['/admin/home']);
        } else {
          this.toastrService.error(
            'An error occured on edit Recipe!',
            'Error'
          );
        }
      });
  }
}
