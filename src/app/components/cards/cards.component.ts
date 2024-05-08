import { Component } from '@angular/core';
import { AppModule } from '../../app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {

  constructor(private router: Router) {}

  onDetails(): void {
    this.router.navigate(['/recipe/details']);
  }

}
