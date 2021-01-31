import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {User} from '../../../shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  submitted: boolean = false
  loginFormGroup: FormGroup
  authSubscription: Subscription

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
    });

    
  }

  submit() {
    if (this.loginFormGroup.invalid) {
      return
    }
    
    const user: User = this.loginFormGroup.value
    this.submitted = true
    this.authSubscription = this.authService.login(user).subscribe(() => {
      this.loginFormGroup.reset()
      this.submitted = false
      this.router.navigate(['/admin', 'dashboard'])
      this.authSubscription.unsubscribe()
    })
  }

}
