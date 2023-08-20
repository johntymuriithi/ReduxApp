import React from 'react'
import { Link } from 'react-router-dom'

const UserSingle = ({user}) => {
  return (
    <article>
            <section>
                <h1>{user.name}</h1>
                <p>{user.username}</p>
                <h1>{user.company}</h1>
                <Link to={`users/${user.id}`}>View User</Link>

            </section>
        </article>
  )
}

export default UserSingle

  
