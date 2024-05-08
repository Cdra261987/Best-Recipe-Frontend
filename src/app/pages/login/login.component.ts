import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from '../../models/user';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'login-page',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

    public formLogin!: FormGroup;
    private user!: User;

    constructor(private fb: FormBuilder, public router: Router) {}

    ngOnInit(): void {
      this.formLogin = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9_.-]*$')])
      });  
    }

    public onLogin() {
        //Add into user with form values
        this.user = {
            email: this.formLogin.controls['email'].value,
            password: this.formLogin.controls['password'].value,
            name: ''
        }
        //Sendo values to Service
        //If returns of service success
        this.router.navigate(['/home']); //Redirect to Home
        localStorage.setItem('user', JSON.stringify(this.user)); //Save user in localStorage
    }
}