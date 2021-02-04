import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts:Post[]
  getAllPostsSubscription$: Subscription

  constructor(
    private _postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.getAllPostsSubscription$ = this._postsService.getAll().subscribe(response => {
      this.posts = response
    })
  }

  ngOnDestroy(): void {
    this.getAllPostsSubscription$.unsubscribe();
  }

  deletePost(id: string) {}

}
