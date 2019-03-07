// ducks-modular-redux pattern to have everything in a single place

import { Reducer } from 'redux';
import { IAction, IUser } from '../models';
import { UserService } from './userService';

export enum ACTION_TYPES {
    GET_USERS = 'GET_USERS',
    GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
    GET_USERS_FAIL = 'GET_USERS_FAIL',
    CREATE_USER = 'CREATE_USER',
    CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL = 'CREATE_USER_FAIL',
}

const initialState = {
    users: []
};

function usersReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case ACTION_TYPES.CREATE_USER: {
            return { ...state, isLoading: true };
        }
        case ACTION_TYPES.CREATE_USER_SUCCESS: {
            const users = [action.data, ...state.users];
            return { ...state, users, isLoading: true };
        }
        case ACTION_TYPES.CREATE_USER_FAIL: {
            return { ...state, isLoading: false, errorMessage: action.data.errorMessage };
        }
        case ACTION_TYPES.GET_USERS: {
            return { ...state, isLoading: true };
        }
        case ACTION_TYPES.GET_USERS_SUCCESS: {
            return {
                ...state,
                users: action.data,
                isLoading: false
            };
        }
        case ACTION_TYPES.GET_USERS_FAIL: {
            return { ...state, isLoading: false, errorMessage: action.data.errorMessage };
        }
        default: {
            return state;
        }
    }
}

export default usersReducer as Reducer;

// ACTIONS
export const createUser = (user: IUser) => {
    return (dispatch: any) => {
        dispatch(request(user));

        UserService.addUser(user)
            .then((user: IUser) => {
                dispatch(success(user));
            })
            .catch((exception: { message: string }) => {
                dispatch(failure(exception));
            });

        function request(user: IUser): IAction {
            return { type: ACTION_TYPES.CREATE_USER, data: user };
        }

        function success(user: IUser): IAction {
            return { type: ACTION_TYPES.CREATE_USER_SUCCESS, data: user };
        }

        function failure(error: { message: string }): IAction {
            return { type: ACTION_TYPES.CREATE_USER_FAIL, data: { errorMessage: error.message } };
        }
    };
};

export const getUsers = (dispatch: any) => {
    dispatch(request());

    UserService.getUsers()
        .then((usersList: IUser[]) => {
            dispatch(success(usersList));
        })
        .catch((exception: { message: string }) => {
            dispatch(failure(exception));
        });

    function request(): IAction {
        return { type: ACTION_TYPES.GET_USERS };
    }

    function success(usersList: IUser[]): IAction {
        return { type: ACTION_TYPES.GET_USERS_SUCCESS, data: usersList };
    }

    function failure(error: { message: string }): IAction {
        return { type: ACTION_TYPES.GET_USERS_FAIL, data: { errorMessage: error.message } };
    }
};
