import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { delay, switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  postId: string
  post: Post
  editPostForm: FormGroup
  formSubmitted: boolean = false

  constructor(
    private _route: ActivatedRoute,
    private _postsService: PostsService,
    private _matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this._route.params.pipe(
      switchMap((params: Params) => {
        this.postId = params.id
        return this._postsService.get(params.id)
      })
    )
    .subscribe(post => {
      
      this.post = post

      this.editPostForm = new FormGroup({
        title: new FormControl(post.title, [Validators.required, Validators.minLength(6), Validators.maxLength(128)]),
        text: new FormControl(post.text, [Validators.required, Validators.minLength(10), Validators.maxLength(1024)]),
        author: new FormControl(post.author, [Validators.required, Validators.minLength(2), Validators.maxLength(48)]),
      })
    })
  }

  submit() {
    if (this.editPostForm.invalid) {
      return
    }

    this.formSubmitted = true

    const editedPost = {
      ...this.post,
      ...this.editPostForm.value
    }

    this._postsService.update(editedPost)
    .subscribe(response => {
      
      this._matSnackBar.open('Post edited!', '', {
        duration: 5000
      })
      
      this.formSubmitted = false
    })
  }

}
