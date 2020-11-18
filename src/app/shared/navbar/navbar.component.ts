import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private navbarService: NavbarService) { }
  isCollapsed = true;

  ngOnInit(): void {
  }

  toggleSidebarPin() {
    this.navbarService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.navbarService.toggleSidebar();
  }

}
