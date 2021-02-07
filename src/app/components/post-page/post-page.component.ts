import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post: Post

  constructor(
    private _postsService: PostsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.params
    .pipe(
      switchMap((params: Params) => {
        return this._postsService.get(params.id)
      })
    )
    .subscribe(post => {
      if (post.author == null) this._router.navigate(['/'])
      this.post = post
    })
  }

}
