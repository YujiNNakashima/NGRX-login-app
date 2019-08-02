import { Action } from '@ngrx/store';

export enum UIActionEnum {
    ATIVAR_LOADING = '[UI] Loading...',
    DESATIVAR_LOADING = '[UI] Finished Loading!'
}

export class loadingAction implements Action {
    readonly type = UIActionEnum.ATIVAR_LOADING;
}

export class finishedLoadingAction implements Action {
    readonly type = UIActionEnum.DESATIVAR_LOADING;
}

export type actions = loadingAction | finishedLoadingAction;