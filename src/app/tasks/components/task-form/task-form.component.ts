import { Component, OnInit, OnDestroy } from '@angular/core';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

// rxjs
// @NgRx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState, selectSelectedTaskByUrl    } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';

// import { switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { TaskModel, Task } from './../../models/task.model';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy  {
  task: TaskModel;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // it is not necessary to save subscription to route.paramMap
    // when router destroys this component, it handles subscriptions automatically
    const  observer = {
      next: task => {
        if (task) {
          this.task = {...task} as TaskModel;
        } else {
          this.task = new TaskModel();
        }
  

      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store
      .pipe(
        select(selectSelectedTaskByUrl),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
}


  onSaveTask() {
    const task = { ...this.task } as TaskModel;

    if (task.id) {
      this.store.dispatch(TasksActions.updateTask({ task }));
} else {
      this.store.dispatch(TasksActions.createTask({ task }));
}

  }

  onGoBack(): void {
    this.store.dispatch(RouterActions.go({
      path: ['/home']
    }));

  }
}
