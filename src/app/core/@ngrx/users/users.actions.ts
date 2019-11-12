import { createAction, props } from '@ngrx/store';

import { UserModel, User } from './../../../users/models/user.model';

export const getUsers = createAction('[Users Page (App)] GET_USERS');
export const getUsersSuccess = createAction(
  '[Get Users Effect] GET_USERS_SUCCEESS',
  props<{ users: UserModel[] }>()
);
export const getUsersError = createAction(
  ' Get Users Effect] GET_USERS_ERROR',
  props<{ error: Error | string }>()
);

export const createUser = createAction(
  '[Add/Edit User Page] CREATE_USER',
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  '[Create User Effect] CREATE_USER_SUCCESS',
  props<{ user: User }>()
);

export const createUserError = createAction(
  '[Create User Effect] CREATE_USER_ERROR',
  props<{ error: Error | string }>()
);

export const updateUser = createAction(
  '[Add/Edit User Page] UPDATE_USER',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[Update User Effect] UPDATE_USER_SUCCESS',
  props<{ user: User }>()
);

export const updateUserError = createAction(
  '[Update User Effect] UPDATE_USER_ERROR',
  props<{ error: Error | string }>()
);

export const deleteUser = createAction(
  '[User List Page] DELETE_USER',
  props<{ user: User }>()
);

export const deleteUserSuccess = createAction(
  '[Delete User Effect] DELETE_USER_SUCCESS',
  props<{ user: User }>()
);

export const deleteUserError = createAction(
  '[Delete User Effect] DELETE_USER_ERROR',
  props<{ error: Error | string }>()
);

export const setOriginalUser = createAction(
  '[Add/Edit User Page (App)] SET_ORIGINAL_USER',
  props<{ user: User }>()
);
