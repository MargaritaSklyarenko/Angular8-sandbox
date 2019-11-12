import { Injectable } from '@angular/core';

// @ngrx
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  selectTasksData,
  selectTasksError,
  selectSelectedTaskByUrl
} from './tasks.selectors';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

// rxjs
import { Observable } from 'rxjs';

import { Task, TaskModel } from 'src/app/tasks/models/task.model';
import { NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksFacade {
  tasks$: Observable<ReadonlyArray<Task>>;
  tasksError$: Observable<Error | string>;
  selectedTaskByUrl$: Observable<TaskModel>;

  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.pipe(select(selectTasksData));
    this.tasksError$ = this.store.pipe(select(selectTasksError));
    this.selectedTaskByUrl$ = this.store.pipe(select(selectSelectedTaskByUrl));
  }

  createTask(props: { task: Task }) {
    this.store.dispatch(TasksActions.createTask(props));
  }

  updateTask(props: { task: Task }) {
    this.store.dispatch(TasksActions.updateTask(props));
  }

  deleteTask(props: { task: Task }) {
    this.store.dispatch(TasksActions.deleteTask(props));
  }

  // TODO: should it be moved to RouterFacade?
  goTo(props: {
    path: any[];
    queryParams?: object;
    extras?: NavigationExtras;
  }) {
    this.store.dispatch(RouterActions.go(props));
  }
}
