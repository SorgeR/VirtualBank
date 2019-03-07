import { ACTION_TYPES } from '../store/usersReducer';

export interface IAction {
    type: keyof typeof ACTION_TYPES,
    data?: any,
    payload?: any
}