import { Component, OnInit, ViewChild } from '@angular/core';
import { UrlTree } from '@angular/router';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

// rxjs
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

import {
  AutoUnsubscribe,
  DialogService,
  CanComponentDeactivate
} from './../../../core';
import { UserModel, User  } from './../../models/user.model';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState } from './../../../core/@ngrx';

import { selectSelectedUserByUrl } from 'src/app/core/@ngrx/data/entity-store.module';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { NgForm } from '@angular/forms';



@AutoUnsubscribe()
@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})

export class UserFormComponent implements OnInit, CanComponentDeactivate {
  @ViewChild('form', { static: false })
  userForm: NgForm;
  private userService: EntityCollectionService<User>;
  private isSubmitClick = false;

  user: UserModel;
  private sub: Subscription;
  

  constructor(
    private dialogService: DialogService,
    private store: Store<AppState>,
    entitytServices: EntityServices
  ) {
    // get service for the entity User
    this.userService = entitytServices.getEntityCollectionService('User');
  }

  ngOnInit(): void {
    // data is an observable object
    // which contains custom and resolve data
    this.sub = this.store.pipe(select(selectSelectedUserByUrl))
    .subscribe(user => this.user = {...user});
  }

  onSaveUser() {
    const user = { ...this.user } as User;
    this.isSubmitClick = true;
    if (user.id) {
      this.userService.update(user);
    } else {
      this.userService.add(user);
    }
    this.onGoBack();
  }

  onGoBack() {
    this.store.dispatch(RouterActions.back());
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (this.isSubmitClick) {
        return true;
     }
  
     if (this.userForm.pristine) {
        return true;
     }
  
     // Otherwise ask the user with the dialog service and return its
     // promise which resolves to true or false when the user decides
     return this.dialogService.confirm('Discard changes?');  
  }
}
