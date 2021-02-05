import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/shared/services/posts.service';
import { PostListItem } from '../../shared/interfaces/post-list-item.interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  animations: [
    trigger('deleteItem', [
      state('start', style({
        transform: 'translateX(-40%)',
        opacity: '0'
      })),
      transition('* => start', animate(200))
    ])
  ]
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  postListItems:PostListItem[] = []
  getAllPostsSubscription$: Subscription
  loadingPosts: boolean = true
  searchQuery: string = ''
  searchType: string = 'title'

  constructor(
    private _postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.getAllPostsSubscription$ = this._postsService.getAll().subscribe(response => {

      response.forEach(post => {
        this.postListItems.push({
          post,
          loading: false
        })
      })
      this.loadingPosts = false
    })
  }

  ngOnDestroy(): void {
    this.getAllPostsSubscription$.unsubscribe();
  }

  deletePost(id: number) {
    this.postListItems[id].loading = true
    

    this._postsService.delete(this.postListItems[id].post.id)
    .subscribe(() => {
      this.postListItems[id].loading = false
      this.postListItems[id].animationState = 'start'

      setTimeout(() => {
        this.postListItems = this.postListItems.filter((item, i) => i != id)
      }, 300)
      
    })
  }

}
