import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    standalone: true
})
export class NavBarComponent implements OnInit {

    public isUserLogged: boolean = false;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.getUserLoggedStatus()
    }

    private getUserLoggedStatus(): void {
        this.authService.isLogged.subscribe((logged) => this.isUserLogged = logged);
    }

    onProfile(): void {
        this.router.navigate(['/profile']);
    }

    onFavoriteRecipes(): void {
        this.router.navigate(['/recipe/favorites']);
    }

    onHome(): void {
        this.router.navigate(['/home']);
    }
}