import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) {  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['admin@eventsbooking.com', [Validators.required, Validators.email]],
        password: ['eventsbookingadmin', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    // authenticating with user's credentials
    this.authService.login(this.f.username.value, this.f.password.value).subscribe(response => { 
      console.log("Is Login Success: " + response); 
      if(response) {
        this.router.navigate(['/events']); 
        window.location.href = '/events';
      }
      if (!response) {
        this.error = "Login failed. Please try again!"
        this.loading = false;
      }
    }, 
    error => {
      this.error = error;
      this.loading = false;
    });

  }
}