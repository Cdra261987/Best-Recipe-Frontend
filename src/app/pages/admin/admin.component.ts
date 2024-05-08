import { Component } from "@angular/core";
import { AdminNavBarComponent } from "./components/navbar/navbar.component";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    standalone: true,
    imports: [AdminNavBarComponent]
})
export class AdminComponent {}