import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  EntityMetadataMap,
  EntityDataModule,
  DefaultDataServiceConfig
} from '@ngrx/data';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router/router.selectors';
import { UserModel, User } from 'src/app/users/models/user.model';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000/'
};

// rule for json-server
const pluralNames = {
  User: 'User'
};

// only one entity collection User
export const entityMetadata: EntityMetadataMap = {
  User: {}
};

// custom feature selector
export const selectEntityCacheState = createFeatureSelector('entityCache');

// custom selector
export const selectUsersEntitites = createSelector(
  selectEntityCacheState,
  (entityState: any) => {
    return entityState.User.entities;
  }
);

// custom selector
export const selectEditedUser = createSelector(
  selectUsersEntitites,
  selectRouterState,
  (users, router): User => {
    const userID = router.state.params.editedUserID;
    if (userID && users) {
      return users[userID];
    } else {
      return null;
    }
  }
);

// custom selector
export const selectSelectedUserByUrl = createSelector(
  selectUsersEntitites,
  selectRouterState,
  (users, router): User => {
    const userID = router.state.params.userID;
    if (userID && users) {
      return users[userID];
    } else {
      return new UserModel(null, '', '');
    }
  }
);

@NgModule({
  imports: [
    CommonModule,
    EntityDataModule.forRoot({ entityMetadata, pluralNames })
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }
  ]
})
export class EntityStoreModule {}
