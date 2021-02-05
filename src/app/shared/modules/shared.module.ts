import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ExcerptPipe } from "../pipes/excerpt.pipe";
import { PostsFilterPipe } from "../pipes/posts-filter.pipe";


@NgModule({

    declarations: [
        ExcerptPipe,
        PostsFilterPipe
    ],

    imports: [
        HttpClientModule
    ],

    exports: [
        HttpClientModule,
        ExcerptPipe,
        PostsFilterPipe
    ],

    providers: [
    ]
})

export class SharedModule {

}