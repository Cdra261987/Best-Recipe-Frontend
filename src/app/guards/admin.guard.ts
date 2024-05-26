import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    if(localStorage.getItem('admin') === null) {
        router.navigate(['/home']);
        return false;
    } else return true;
}