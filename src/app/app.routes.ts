import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.component';
import { LoginPage } from './pages/login/login.component';
import { RegisterPage } from './pages/register/register.component';
import { ProfilePage } from './pages/profile/profile.component';
import { RecipePageDetails } from './pages/recipes/details/recipe.component';
import { RecipePageEdit } from './pages/recipes/edit/edit.component';
import { authGuard } from './guards/auth.guard';
import { RecipePageFavorites } from './pages/recipes/favorites/favorites.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminUserComponent } from './pages/admin/pages/users/user.component';
import { AdminRecipeComponent } from './pages/admin/pages/recipes/recipe.component';
import { AdminRecipeEdit } from './pages/admin/pages/recipes/edit/edit.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'profile',
    component: ProfilePage,
    //canActivate: [authGuard]
  },
  {
    path: 'recipe',
    children: [
      {
        path: 'details',
        component: RecipePageDetails,
      },
      {
        path: 'edit/:id',
        component: RecipePageEdit,
      },
      {
        path: 'add',
        component: RecipePageEdit,
      },
      {
        path: 'favorites',
        component: RecipePageFavorites,
      },
    ],
    //canActivate: [authGuard]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'home',
        component: AdminComponent,
      },
      {
        path: 'users',
        component: AdminUserComponent,
      },
      {
        path: 'recipes',
        children: [
          {
            path: '',
            component: AdminRecipeComponent,
          },
          {
            path: 'edit',
            component: AdminRecipeEdit,
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '' }, //Not found router
];
