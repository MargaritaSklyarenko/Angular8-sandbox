// @NgRx
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { metaReducers } from './meta-reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TasksStoreModule } from './tasks/tasks-store.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true,
       strictStateSerializability: true,
       strictActionSerializability: true
     }
   }),
   EffectsModule.forRoot([]),
    // Instrumentation must be imported after importing StoreModule (config is optional) 
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TasksStoreModule
  ]
})
export class RootStoreModule { }
