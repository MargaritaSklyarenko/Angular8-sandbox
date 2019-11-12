// NgRx
import { Store, select } from '@ngrx/store';
import { AppState, selectSelectedUserByUrl } from './../../core/@ngrx';
import * as UsersActions from './../../core/@ngrx/users/users.actions';

import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { delay, map, catchError, tap, finalize, take } from 'rxjs/operators';

import { UserModel } from './../models/user.model';
import { UsersServicesModule } from '../users-services.module';
import { SpinnerService } from './../../widgets';

@Injectable({
  providedIn: UsersServicesModule
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private store: Store<AppState>,
  ) {}

  resolve(): Observable<UserModel> | null {
    console.log('UserResolve Guard is called');
    this.spinner.show();

    return this.store.pipe(
      select(selectSelectedUserByUrl),
      tap(user => this.store.dispatch(UsersActions.setOriginalUser({ user }))),
      delay(2000),
      map((user: UserModel) => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/users']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  } 

}
