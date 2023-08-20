import { Link } from "react-router-dom"

const Header = () => {
  return (
    <>
        <section>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="users">Add User</Link></li>
            </ul>
        </section>
    </>
  )
}

export default Header
