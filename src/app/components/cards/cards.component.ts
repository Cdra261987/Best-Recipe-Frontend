import { Component, Input } from '@angular/core';
import { AppModule } from '../../app.module';
import { Router } from '@angular/router';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-cards',
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {

  @Input() recipe!: Recipe;

  constructor(private router: Router) {}

  onDetails(): void {
    this.router.navigate(['/recipe/details/' + this.recipe.id]);
  }

}
