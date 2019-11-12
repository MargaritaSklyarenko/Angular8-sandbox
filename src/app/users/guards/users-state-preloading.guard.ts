import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { EntityServices, EntityCollectionService } from '@ngrx/data';
import { User } from '../models/user.model';

import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';

import { UsersServicesModule } from '../users-services.module';

@Injectable({
  providedIn: UsersServicesModule
})
export class UsersStatePreloadingGuard implements CanActivate {
  private userService: EntityCollectionService<User>;

  constructor( entitytServices: EntityServices ) {
          // получить сервис для entity User
    this.userService = entitytServices.getEntityCollectionService('User');

    }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.userService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.userService.getAll();
        }
      }),
      take(1)
    );
  }
}
