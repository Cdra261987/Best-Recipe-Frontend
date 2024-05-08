import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecipeService } from './services/recipe.service';

@NgModule({
    imports: [ 
        BrowserModule, 
        CommonModule,
        NgbModule,
        RouterModule.forRoot(routes, { enableTracing: true }),
    ]

})
export class AppModule {}