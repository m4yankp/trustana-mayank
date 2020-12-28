import React, { useContext } from 'react';
import UserTable  from "../userTable";
import { Store } from '../../Store';

export default function UserData(): JSX.Element {
  const { state, dispatch } = useContext(Store);
  return (
    <UserTable state={state} />
  )
}
