import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  public formLogin!: FormGroup;
  private user!: User;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
      ]),
    });
  }

  public onLogin() {
    //Add into user with form values
    this.user = {
      email: this.formLogin.controls['email'].value,
      password: this.formLogin.controls['password'].value,
      name: '',
    };
    //Sendo values to Service
    this.authService
      .login(this.user.email, this.user.password)
      .subscribe((response) => {
        if (response != null) {
          //If returns of service success
          this.toastrService.success('Your login was successful!', 'Success');
          this.router.navigate(['/home']); //Redirect to Home
        } else {
          //Display error notification
          this.toastrService.error('An error happened!', 'Error');
        }
      });
  }
}
