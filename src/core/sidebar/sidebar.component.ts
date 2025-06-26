import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'taskly-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isCollapsed = false;
  isMemberCollasped = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleMemberMenu() {
    this.isMemberCollasped = !this.isMemberCollasped;

  }

}