import { createFeatureSelector, createSelector  } from '@ngrx/store';

import { adapter, TasksState } from './tasks.state';

import { TaskModel } from './../../../tasks/models/task.model';
import { selectRouterState } from '../router';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const {
    selectEntities: selectTasksEntities,
    selectAll: selectTasksData
  } = adapter.getSelectors(selectTasksState);
  
export const selectTasksError = createSelector(selectTasksState, (state: TasksState) => state.error);
export const selectTasksLoaded = createSelector(selectTasksState, (state: TasksState) => state.loaded);

export const selectSelectedTaskByUrl = createSelector(
    selectTasksEntities,
    selectRouterState,
    (tasks, router): TaskModel => {
        const taskID = router.state.params.taskID;
        if (taskID) {
            return tasks[taskID] as TaskModel;
        } else {
            return new TaskModel();
        }
});
