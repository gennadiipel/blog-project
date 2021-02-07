import { Pipe, PipeTransform } from "@angular/core";
import { PostListItem } from "src/app/admin/shared/interfaces/post-list-item.interface";

@Pipe({
    name: 'postsFilter',
    pure: false
})

export class PostsFilterPipe implements PipeTransform {
    transform(posts: PostListItem[], type: string = 'title', query: string = '') {
        if (query.trim() == '') {
            
            posts.map(item => {
                item.searchAuthor = item.post.author
                item.searchTitle = item.post.title
            })
            
            return posts
        }
        
        let queryResult = posts.filter(item => item.post[type].toLowerCase().includes(query.toLowerCase()))
        queryResult.forEach((item, i) => {
            const lowerCaseString = item.post[type].toLowerCase()
            const start = lowerCaseString.indexOf(query.toLowerCase())
            const end = start + query.length
            const resultLine = `${item.post[type].slice(0, start)}<b>${item.post[type].slice(start, end)}</b>${item.post[type].slice(end)}`
            console.log(resultLine)
            if (type == 'title') queryResult[i].searchTitle = resultLine
            else queryResult[i].searchAuthor = resultLine 
        })

        return queryResult
    }

}