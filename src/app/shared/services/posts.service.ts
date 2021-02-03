import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Post } from "../interfaces/post.interface";
import { FbCreateResponse } from "../interfaces/fb-create-response.interface";
@Injectable({providedIn: 'root'})


export class PostsService {
    constructor( private _http: HttpClient ) {}

    create(post: Post): Observable<Post> {
        return this._http.post(`${environment.fbDBHost}/posts.json`, post)
        .pipe(
            map((response: FbCreateResponse) => {
                return {
                    ...post,
                    id: response.name,
                    date: new Date(post.date)
                }
            })
        );
    }
}