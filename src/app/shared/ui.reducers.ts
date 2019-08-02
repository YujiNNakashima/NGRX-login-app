import * as FromUI from './ui.actions';

export interface State {
    loading: boolean;
}

export const initialState: State = {
    loading: false
    
}
export function uiReducer(state = initialState, action: FromUI.actions) {
    switch(action.type) {
        case FromUI.UIActionEnum.ATIVAR_LOADING:
            return {
                ...state,
                loading: true
            };
        case FromUI.UIActionEnum.DESATIVAR_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}