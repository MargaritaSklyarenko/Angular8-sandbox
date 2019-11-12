// @NgRx
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { metaReducers } from './meta-reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TasksStoreModule } from './tasks/tasks-store.module';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { routerReducers, CustomSerializer } from './router';
import { UsersStoreModule } from './users/users-store.module';


@NgModule({
  declarations: [],
  // 2
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers, {
      metaReducers,
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true,
        // router state is not serializable
        // set false if you don't use CustomSerializer
       strictStateSerializability: true,
        // router action is not serializable
        // set false
       strictActionSerializability: false
     }
   }),
   StoreRouterConnectingModule.forRoot({
    stateKey: 'router',
    routerState: RouterState.Minimal
    // serializer: CustomSerializer // has a priority over routerState
  }),
   EffectsModule.forRoot([]),
    // Instrumentation must be imported after importing StoreModule (config is optional) 
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    TasksStoreModule,
    UsersStoreModule
  ]
})
export class RootStoreModule { }
