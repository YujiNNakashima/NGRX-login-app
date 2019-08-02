import * as fromUI from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducers';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    uiState: fromUI.State;
    authState: fromAuth.IAuthState; 
}

export const reducers: ActionReducerMap<AppState> = {
    uiState: fromUI.uiReducer,
    authState: fromAuth.authReducer
}


