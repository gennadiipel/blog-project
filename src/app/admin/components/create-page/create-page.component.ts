import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  createPostForm: FormGroup
  @ViewChild('newPostForm') newPostForm;

  constructor(
    private _postsService: PostsService,
    private _matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
      'author': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(48)]),
      'text': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(1024)])
    });
  }

  submit() {
    if (this.createPostForm.invalid) {
      return
    }

    const post:Post = {...this.createPostForm.value};

    this._postsService.create(post).subscribe(resp => {
      this._matSnackBar.open('Post created!', '', {
        duration: 5000
      })
      
      this.newPostForm.resetForm();

    })

  }

}
