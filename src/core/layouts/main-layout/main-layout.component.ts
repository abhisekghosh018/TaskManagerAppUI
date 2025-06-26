import { Component } from '@angular/core';
import { TopbarComponent } from "../../topbar/topbar.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'taskly-main-layout',
  standalone: true,
  imports: [TopbarComponent, SidebarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
