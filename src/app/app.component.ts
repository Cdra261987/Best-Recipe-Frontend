import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotifierModule } from 'angular-notifier';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, NotifierModule]
})
export class AppComponent {
  title = 'bestRecipes_project';
}
