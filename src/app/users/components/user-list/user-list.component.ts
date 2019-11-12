import { Component, OnInit } from '@angular/core';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

// rxjs
import { Observable, Subscription, of } from 'rxjs';
import { UserModel, User  } from './../../models/user.model';
import { Store, select } from '@ngrx/store';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';
import { AppState, selectUsers, selectUsersError, selectEditedUser } from './../../../core/@ngrx';
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
  
  private editedUser: UserModel;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.users$ = this.store.pipe(select(selectUsers));
    this.usersError$ = this.store.pipe(select(selectUsersError));
    this.store.dispatch(UsersActions.getUsers());

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
    this.store.dispatch(UsersActions.deleteUser({ user: userToDelete }));

  }
}
