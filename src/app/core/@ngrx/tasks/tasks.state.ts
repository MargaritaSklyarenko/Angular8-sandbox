import { Task } from './../../../tasks/models/task.model';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
export interface TasksState extends EntityState<Task>  {
  data: ReadonlyArray<Task>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

export function selectTaskId(task: Task): number {
  // In this case this would be optional since primary key is id
  return task.id;
}

export function sortTasksByAction(task1: Task, task2: Task): number {
  return task1.action.localeCompare(task2.action);
}

// 4
export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: selectTaskId,
  sortComparer: sortTasksByAction
});


export const initialTasksState: TasksState = adapter.getInitialState({
    data: [],
    loading: false,
    loaded: false,
    error: null

});
