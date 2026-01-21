import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: 'task-list', component: TaskListComponent, title: 'Task List' },
];
