import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginFormGroup: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      'login': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    });

    
  }

  submit() {
    if (this.loginFormGroup.invalid) {
      return
    }
    
    const user: User = this.loginFormGroup.value

    console.log(user)
  }

}
