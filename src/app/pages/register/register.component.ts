import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../models/user";

@Component({
    selector: 'register-page',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
    
    formRegister !: FormGroup;
    private user !: User;

    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.formRegister = this.fb.group({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9_.-]*$')])
        })
    }

    onRegister() {
        this.user = {
            name: this.formRegister.controls['name'].value,
            email: this.formRegister.controls['email'].value,
            password: this.formRegister.controls['password'].value,
        };

        //Send request to Service
        //If success
        this.router.navigate(['/home']);
        localStorage.setItem('user', JSON.stringify(this.user)); //Save user in localStorage
    }
}