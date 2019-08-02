import { AppState } from './../app.reducer';
import { User } from './user.model';
import * as fromAuth from './auth.actions';

export interface IAuthState {
    user: User;
}

const authInitialState: IAuthState = {
    user: null
}

export function authReducer(state = authInitialState, action: fromAuth.authActions): IAuthState {
    switch (action.type) {

        case fromAuth.SET_USER:
            return {
                user: {...action.user}
            }

        case fromAuth.UNSET_USER:
            return {
                user: null
            }

        default:
            return state;
    }

}