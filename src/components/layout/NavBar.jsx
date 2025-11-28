import { NavLink } from 'react-router-dom'

function NavBar({ isOpen = false, onNavigate }) {
  const linkClass = ({ isActive }) =>
    ['nav-link', isActive ? 'nav-link--active' : ''].filter(Boolean).join(' ')

  const handleNav = () => {
    onNavigate?.()
  }

  return (
    <nav id="primary-nav" className={`navbar ${isOpen ? 'navbar--open' : ''}`} aria-label="Primary">
      <div className="navbar__brand">Taskflow</div>
      <ul>
        <li>
          <NavLink className={linkClass} to="/" end onClick={handleNav}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClass} to="/today" onClick={handleNav}>
            Today
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClass} to="/categories" onClick={handleNav}>
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClass} to="/completed" onClick={handleNav}>
            Completed
          </NavLink>
        </li>
        <li>
          <NavLink className={linkClass} to="/settings" onClick={handleNav}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
