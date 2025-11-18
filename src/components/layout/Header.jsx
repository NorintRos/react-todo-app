import NavBar from './NavBar.jsx'

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand">
          <span className="brand-mark">✓</span>
          <div>
            <div>Taskflow</div>
            <small style={{ color: '#cbd5e1', fontWeight: 500 }}>React Todo</small>
          </div>
        </div>

        <NavBar />

        <div className="header-actions">
          <button className="btn ghost" type="button">Log in</button>
          <button className="btn primary" type="button">Get started</button>
        </div>
      </div>
    </header>
  )
}

export default Header
