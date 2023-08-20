import React from 'react'
import { selectUserById } from './usersSlice'
import { useSelector } from 'react-redux'

import { Link, useParams } from 'react-router-dom';

const SingleUser = () => {
    const {userId} = useParams();

    const user = useSelector((state) => selectUserById(state, Number(userId)));

    if (!user)
    {
        return (
            <section>
                <h1>Page not Found</h1>
            </section>
        )
    }
  return (
    <section>
        <article>
            <h1>{user.name}</h1>
            <h1>{user.username}</h1>
            <h1>{user.phone}</h1>
            <h1>{user.street}</h1>
            <h1>{user.companyName}</h1>
            <h1>{user.email}</h1>
            <Link to={`/users/edit/${user.id}`}>Edit User</Link>
        </article>
    </section>
  )
}

export default SingleUser;
