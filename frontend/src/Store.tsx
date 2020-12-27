import React, { useReducer } from 'react';
import { ILoggedInUser, IAction } from './Interfaces';


const initialState: ILoggedInUser = {
   firstName: '',
   lastName: '',
    dateOfBirth: '',
    address: '',
    username: '',
    password: '',
    filePath: '',
    loginToken: '',
    dateCreated: ''
}

export const Store = React.createContext<ILoggedInUser | any >(initialState);

function reducer(state: ILoggedInUser, action: IAction): ILoggedInUser {
    
    switch(action.type)
    {
        case 'SET_TOKEN':
            return {...state, loginToken: action.payload.token, username: action.payload.username}
        case 'LOGOUT':
            return {...state, firstName: '', lastName: '', dateOfBirth: '', address: '', username: '', password: '', filePath: '', loginToken: '', dateCreated: '' }
        case 'GET_USER_DATA':
            return {...state,  firstName: action.payload.firstName, lastName: action.payload.lastName, address: action.payload.address, dateOfBirth: action.payload.dateOfBirth, filePath: action.payload.filePath,  dateCreated: action.payload.dateCreated }
        default: 
            return state
    }
}

export function StoreProvider(props: any): JSX.Element {
    const [state, dispatch] = useReducer(reducer,initialState);
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}