import React from "react";
import { useSelector, useDispatch} from "react-redux";
import {selectAllUsers, getErrorUsers, getStatusUsers, fetchUsers} from "./usersSlice"
import { useEffect } from "react";
import UserSingle from "./userSingle";

export default function UsersList() {

  const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);
    console.log(users);

    const userStatus = useSelector(getStatusUsers);
    const userError = useSelector(getErrorUsers);

    console.log(userError);
    console.log(userStatus);

    useEffect(() => {
      if (userStatus === 'idle')
      {
        dispatch(fetchUsers());
      }
    }, [userStatus, dispatch]);

    let content;

    if (userStatus === 'loading'){
      content = <p>Wait For a Minute as Your Information Is Loading!</p>
    }
    else if (userStatus === 'succeeded') {
      content = users.map(user => <UserSingle key={user.id} user={user} />)
    } else if (userStatus === 'failed')
    {
      content = <p>{userError}</p>;
    }
    

  return (
    <div>
      <main>
      <h1>Users</h1>
        {content}
      </main>
    </div>
  )
}
