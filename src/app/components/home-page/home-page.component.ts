import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostListItem } from 'src/app/admin/shared/interfaces/post-list-item.interface';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Post[]>

  constructor(
    private _postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.posts$ = this._postsService.getAll()
  }

}
