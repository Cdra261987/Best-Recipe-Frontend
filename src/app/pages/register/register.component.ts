import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'register-page',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class RegisterPage implements OnInit {
  formRegister!: FormGroup;
  private user!: User;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
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
      isAdmin: new FormControl(false),
    });
  }

  onRegister() {
    this.user = {
      name: this.formRegister.controls['name'].value,
      email: this.formRegister.controls['email'].value,
      password: this.formRegister.controls['password'].value,
      isAdmin: this.formRegister.controls['isAdmin'].value,
    };

    if (this.user.isAdmin) {
      this.authService.registerAdmin(this.user).subscribe(
        () => {
          //If success
          this.toastrService.success(
            'Your register was successful!',
            'Success'
          );
          this.router.navigate(['/admin/home']);
        },
        (err) => {
          //Display error notification
          this.toastrService.error('An error happened!', 'Error');
        }
      );
    } else {
      //Send request to Service
      this.authService.register(this.user).subscribe(
        () => {
          //If success
          this.toastrService.success(
            'Your register was successful!',
            'Success'
          );
          this.router.navigate(['/home']);
        },
        (err) => {
          //Display error notification
          this.toastrService.error('An error happened!', 'Error');
        }
      );
    }
  }
}
