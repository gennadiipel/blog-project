import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {User} from '../../../shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  submitted: boolean = false
  loginFormGroup: FormGroup
  authErrorSubscription: Subscription

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {

    if (this._authService.isAuthenticated()) this._router.navigate(['/admin', 'dashboard'])

    this.loginFormGroup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
    });

    this.authErrorSubscription = this._authService.error$.subscribe(error => {
      this._snackBar.open(error, '', {
        duration: 5000,
      });
      this.submitted = false
    })

  }

  ngOnDestroy(): void {
    this.authErrorSubscription.unsubscribe()
  }

  submit() {
    if (this.loginFormGroup.invalid) {
      return
    }
    
    const user: User = this.loginFormGroup.value
    this.submitted = true
    
    this._authService.login(user).subscribe(() => {
      this.loginFormGroup.reset()
      this.submitted = false
      this._router.navigate(['/admin', 'dashboard'])
    })
  }

}
