import { Component, OnInit } from '@angular/core';
import { UrlTree } from '@angular/router';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

// rxjs
import { Observable, of, Subscription } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import {
  AutoUnsubscribe,
  DialogService,
  CanComponentDeactivate
} from './../../../core';
import { UserModel, User  } from './../../models/user.model';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, selectUsersOriginalUser, selectSelectedUserByUrl } from './../../../core/@ngrx';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';

@AutoUnsubscribe()
@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;
  private sub: Subscription;

  constructor(
    private dialogService: DialogService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // data is an observable object
    // which contains custom and resolve data
    this.sub = this.store.pipe(select(selectSelectedUserByUrl))
    .subscribe(user => this.user = {...user});

  }

  onSaveUser() {
    const user = { ...this.user } as User;
    if (user.id) {
      this.store.dispatch(UsersActions.updateUser({ user }));
    } else {
      this.store.dispatch(UsersActions.createUser({ user }));
    }
  }

  onGoBack() {
    this.store.dispatch(RouterActions.back());
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const flags = [];

      return this.store.pipe(
        select(selectUsersOriginalUser),
        switchMap(originalUser => {
          for (const key in originalUser) {
            if (originalUser[key] === this.user[key]) {
              flags.push(true);
            } else {
              flags.push(false);
            }
          }
  
          if (flags.every(el => el)) {
            return of(true);
          }
  
          // Otherwise ask the user with the dialog service and return its
          // promise which resolves to true or false when the user decides
          return this.dialogService.confirm('Discard changes?');
        })
      );
  
  }
}
