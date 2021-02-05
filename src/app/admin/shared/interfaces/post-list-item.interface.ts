import { Post } from "src/app/shared/interfaces/post.interface";

export interface PostListItem {
    post: Post,
    loading: boolean,
    searchTitle?: string,
    searchAuthor?: string,
    animationState?: string
}