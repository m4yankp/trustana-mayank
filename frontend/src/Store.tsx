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
        case 'FETCH_USER_DETAIL':
            return {...state,  firstName: action.payload.data.firstName }
        default: 
            return state
    }
}

export function StoreProvider(props: any): JSX.Element {
    const [state, dispatch] = useReducer(reducer,initialState);
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}