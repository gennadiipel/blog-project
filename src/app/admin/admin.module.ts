import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './components/create-page/create-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MaterialSharedModule } from "../shared/modules/material-shared.module";
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/modules/shared.module";
import { AuthService } from "./shared/services/auth.service";
import { AuthGuard } from "./shared/services/auth.guard";
import { QuillModule } from "ngx-quill";




@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
      ],
      imports: [
        CommonModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        MaterialSharedModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MatSnackBarModule,
        QuillModule.forRoot(),
        RouterModule.forChild([
          {
            path: '', component: AdminLayoutComponent, children: [
              {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
              {path: 'login', component: LoginPageComponent},
              {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
              {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
              {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}
            ]
          }
        ])
      ],
      providers: [
        AuthService,
        AuthGuard
      ],
      exports: [RouterModule],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminModule {

}