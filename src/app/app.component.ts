import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from "../core/topbar/topbar.component";
import { SidebarComponent } from '../core/sidebar/sidebar.component';
import { HomeComponent } from "../pages/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponent, SidebarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Taskly';
}
