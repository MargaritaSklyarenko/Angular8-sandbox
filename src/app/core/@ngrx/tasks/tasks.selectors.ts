import { createFeatureSelector, createSelector  } from '@ngrx/store';

import { TasksState } from './tasks.state';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectTasksData = createSelector(selectTasksState, (state: TasksState) => state.data);
export const selectTasksError = createSelector(selectTasksState, (state: TasksState) => state.error);
export const selectSelectedTask = createSelector(selectTasksState, (state: TasksState) => state.selectedTask);
export const selectTasksLoaded = createSelector(selectTasksState, (state: TasksState) => state.loaded);
