import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NavBarComponent } from "../../components/navbar/navbar.component";
import { ToastrService } from "ngx-toastr";

type Mode = 'edit' | 'details';

@Component({
    selector: 'profile-page',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarComponent]
})
export class ProfilePage implements OnInit {
    public user !: User;
    public modeComponent: Mode = 'details';
    public formProfile !: FormGroup;

    constructor(private fb: FormBuilder, private toastrService: ToastrService) {}

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') as string);

        this.formProfile = this.fb.group({
            name: new FormControl(this.user.name, [Validators.required, Validators.minLength(5)]),
            email: new FormControl(this.user.email, [Validators.required, Validators.minLength(8), Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        })
    }

    onEdit(): void {
        this.modeComponent = 'edit';
    }

    onEditSubmit(): void {
        this.user.email = this.formProfile.controls['email'].value;
        this.user.name = this.formProfile.controls['name'].value;

        localStorage.setItem('user', JSON.stringify(this.user));

        this.toastrService.success('Your profile information was updated!', 'Success');

        this.modeComponent = 'details';
    }
}