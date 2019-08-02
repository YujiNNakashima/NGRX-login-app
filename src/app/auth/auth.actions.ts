import { User } from './user.model';
import { Action } from '@ngrx/store';

export const SET_USER = '[Auth] Setting user...';
export const UNSET_USER= '[Auth] Unsetting user...';

export class SetUserAction implements Action {
    readonly type = SET_USER;
    constructor(public user: User) {}
}

export class UnsetUserAction implements Action {
    readonly type = UNSET_USER;
}

export type authActions = SetUserAction | UnsetUserAction;