import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ExcerptPipe } from "../pipes/excerpt.pipe";


@NgModule({

    declarations: [
        ExcerptPipe
    ],

    imports: [
        HttpClientModule
    ],

    exports: [
        HttpClientModule,
        ExcerptPipe
    ],

    providers: [
    ]
})

export class SharedModule {

}