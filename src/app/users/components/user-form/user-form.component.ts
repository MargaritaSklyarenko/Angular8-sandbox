import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { Location } from '@angular/common';

// rxjs
import { Observable, of } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import {
  DialogService,
  CanComponentDeactivate
} from './../../../core';
import { UserModel, User  } from './../../models/user.model';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, selectUsersOriginalUser } from './../../../core/@ngrx';
import * as UsersActions from './../../../core/@ngrx/users/users.actions';


@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: DialogService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // data is an observable object
    // which contains custom and resolve data
    this.route.data.pipe(pluck('user')).subscribe((user: UserModel) => {
      this.user = { ...user };
    });
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
    this.location.back();
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
