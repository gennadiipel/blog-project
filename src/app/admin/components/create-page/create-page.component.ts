import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  createPostForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      'postTitle': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      'author': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(48)]),
      'text': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(1024)])
    });
  }

  submit() {
    if (this.createPostForm.invalid) {
      return
    }
  }

}
