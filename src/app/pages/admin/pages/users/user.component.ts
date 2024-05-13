import { Component } from "@angular/core";
import { AdminNavBarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'admin-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    standalone: true,
    imports: [AdminNavBarComponent]
})
export class AdminUserComponent {}