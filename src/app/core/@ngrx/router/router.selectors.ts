import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, getSelectors } from '@ngrx/router-store';

import { RouterStateUrl } from './router.state';

export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const {
    selectQueryParams, // select the current route query params
    selectRouteParams, // select the current route params
    selectRouteData, // select the current route data
    selectUrl // select the current url
  } = getSelectors(selectRouterState);
  