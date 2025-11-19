import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar" aria-label="Primary">
      <ul>
        <li>
          <NavLink className="nav-link" to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/today">Today</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/categories">Categories</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/completed">Completed</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
