import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    console.log("Guard Value: ", authService.isLogged.value);

    if(authService.isLogged.value === false) {
        router.navigate(['login']);
        return false;
    } else return true;
}