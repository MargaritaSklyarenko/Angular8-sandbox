import { Component, OnInit } from '@angular/core';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { selectEditedUser } from './../../../core/@ngrx/data/entity-store.module';
import { map } from 'rxjs/operators';


// rxjs
import { Observable, Subscription, of } from 'rxjs';
import { UserModel, User  } from './../../models/user.model';
import { Store, select } from '@ngrx/store';
import { AppState } from './../../../core/@ngrx';
import { AutoUnsubscribe } from './../../../core/decorators';
@AutoUnsubscribe('subscription')
@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<Array<UserModel>>;
  usersError$: Observable<Error | string>;
  private subscription: Subscription;
  private userService: EntityCollectionService<User>;
  private editedUser: UserModel;

  constructor(
    private store: Store<AppState>,
    entitytServices: EntityServices
  ) {
    // get service for the entity User
    this.userService = entitytServices.getEntityCollectionService('User');
  }

  ngOnInit() {
    // use built-in selector
    this.users$ = this.userService.entities$;

    // use built-in selector with transformation
    // error is in EntityAction
    this.usersError$ = this.userService.errors$.pipe(
      map(action => action.payload.data.error.error.message)
    );

    this.subscription = this.store.pipe(select(selectEditedUser)).subscribe({
      next: user => {
        this.editedUser = { ...user };
        console.log(
          `Last time you edited user ${JSON.stringify(this.editedUser)}`
        );
      },
      error: err => console.log(err)
    });
  }

  onEditUser(user: UserModel) {
    const link = ['/users/edit', user.id];
    this.store.dispatch(RouterActions.go({
      path: link
    }));
  }

  isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }

  onDeleteUser(user: UserModel) {
    const userToDelete: User = { ...user };
    // use service to dispatch EntitytAction
    this.userService.delete(user.id);
  }
}
