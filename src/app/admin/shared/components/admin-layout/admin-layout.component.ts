import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  @ViewChild('drawer') drawer: MatDrawer;

  selectedMenuItem = [];

  constructor(
    private _router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  handleMenuClick() {
    this.drawer.toggle();
    console.log(this.selectedMenuItem)
    this._router.navigate(this.selectedMenuItem[0])
  }

  logout() {
    this.authService.logout()
  }

}
