import { NgModule } from "@angular/core";

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],

    exports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ]
})

export class MaterialSharedModule {

}