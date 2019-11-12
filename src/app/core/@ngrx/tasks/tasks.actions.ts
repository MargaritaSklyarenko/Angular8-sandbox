import { createAction, props } from '@ngrx/store';

import { Task } from './../../../tasks/models/task.model';

export const getTasks = createAction('[Task List Page (App)] GET_TASKS');


export const createTask = createAction(
  '[Task List Page] CREATE_TASK',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Task List Page] UPDATE_TASK',
  props<{ task: Task }>()
);

export const completeTask = createAction(
  '[Task List Page] COMPLETE_TASK',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task List Page] DELETE_TASK',
  props<{ task: Task }>()
);

export const getTasksSuccess = createAction(
    '[Get Tasks Effect] GET_TASKS_SUCCEESS',
    props<{ tasks: Task[] }>()
);

export const getTasksError = createAction(
    '[Get Tasks Effect] GET_TASKS_ERROR',
    props<{ error: Error | string }>()
);

  export const createTaskSuccess = createAction(
    '[Tasks API] CREATE_TASK_SUCCESS',
    props<{ task: Task }>()
  );
  
  export const createTaskError = createAction(
    '[Tasks API] CREATE_TASK_ERROR',
    props<{ error: Error | string }>()
  );
  
  export const updateTaskSuccess = createAction(
    '[Update Task Effect] UPDATE_TASK_SUCCESS',
    props<{ task: Task }>()
  );
  
  export const updateTaskError = createAction(
    '[Update Task Effect] UPDATE_TASK_ERROR',
    props<{ error: Error | string }>()
  );
  
  export const deleteTaskSuccess = createAction(
    '[Delete Task Effect] DELETE_TASK_SUCCESS',
    props<{ task: Task }>()
  );
  
  export const deleteTaskError = createAction(	
    '[Delete Task Effect] DELETE_TASK_ERROR',
    props<{ error: Error | string }>()
  );
  