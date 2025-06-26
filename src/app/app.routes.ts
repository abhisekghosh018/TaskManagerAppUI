import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../core/layouts/main-layout/main-layout.component';
import { HomeComponent } from '../pages/home/home.component';
import { MemberComponent } from '../pages/member/member.component';
import { TasksComponent } from '../pages/tasks/tasks.component';

export const routes: Routes = [

 {
  path: '',
  component: MainLayoutComponent,
  children: [
   { path: '', redirectTo: 'home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
   { path: 'createmember', component: MemberComponent },
   { path: 'tasks', component: TasksComponent },
  ]

 }

];
