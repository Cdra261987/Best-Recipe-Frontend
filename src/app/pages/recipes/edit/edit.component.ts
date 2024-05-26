import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../../components/navbar/navbar.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../models/recipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'recipe-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NavBarComponent],
})
export class RecipePageEdit implements OnInit {
  formRecipe!: FormGroup;
  private recipeId!: number;
  private recipe!: Recipe;
  buttonText: string = 'Create';

  constructor(
    private fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activateRouter.params.subscribe((params) => {
      this.recipeId = params['id'];
      if (this.recipeId != null) {
        this.buttonText = 'Edit';
        this.getRecipeById();
      } else {
        this.buttonText = 'Create';
        this.initForm();
      }
    });
  }

  private initForm(): void {
    this.formRecipe = this.fb.group({
      name: new FormControl(this.recipe?.name ? this.recipe.name : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.recipe?.description ? this.recipe.description : '',
        [Validators.required]
      ),
      duration: new FormControl(
        this.recipe?.duration ? this.recipe.duration : 0,
        [Validators.required]
      ),
      difficulty: new FormControl(
        this.recipe?.difficulty ? this.recipe.difficulty : 0,
        [Validators.required]
      ),
      category: new FormControl(
        this.recipe?.category ? this.recipe.category : '',
        [Validators.required]
      ),
    });
  }

  onCreate(): void {
    if (this.recipe != null) {
      //Edit mode
      this.recipe = {
        ...this.recipe,
        ...this.formRecipe.value,
      };
      this.createRecipe(this.recipe);
    } else {
      //Create mode
      const recipe: Recipe = {
        name: this.formRecipe.controls['name'].value,
        description: this.formRecipe.controls['description'].value,
        duration: this.formRecipe.controls['duration'].value,
        difficulty: this.formRecipe.controls['difficulty'].value,
        category: this.formRecipe.controls['category'].value,
        dateOnly: new Date().toDateString(),
        ingredient: [],
        isActive: true,
        isValid: false,
      };

      this.createRecipe(recipe);
    }
  }

  private createRecipe(recipe: Recipe): void {
    this.recipeService.postRecipe(recipe).subscribe((response) => {
      console.log(response);
      if (response != null) {
        this.toastrService.success(
          'Recipe created/edited successfully!',
          'Success'
        );
        this.router.navigate(['/home']);
      } else {
        this.toastrService.error(
          'An error occured on create/edit Recipe!',
          'Error'
        );
      }
    });
  }

  private getRecipeById(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe((response) => {
      this.recipe = response;
      this.initForm();
    });
  }
}
