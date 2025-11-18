function NavBar() {
  return (
    <nav className="navbar" aria-label="Primary">
      <ul>
        <li><a className="nav-link active" href="/">Dashboard</a></li>
        <li><a className="nav-link" href="/today">Today</a></li>
        <li><a className="nav-link" href="/categories">Categories</a></li>
        <li><a className="nav-link" href="/completed">Completed</a></li>
        <li><a className="nav-link" href="/settings">Settings</a></li>
      </ul>
    </nav>
  )
}

export default NavBar
