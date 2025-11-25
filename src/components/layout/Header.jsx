import { useState } from 'react'
import NavBar from './NavBar.jsx'
import Button from '../ui/Button.jsx'

function Header() {
  const [navOpen, setNavOpen] = useState(false)
  const toggleNav = () => setNavOpen((open) => !open)
  const closeNav = () => setNavOpen(false)

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

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="primary-nav"
          onClick={toggleNav}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="nav-toggle__line" />
          <span className="nav-toggle__line" />
          <span className="nav-toggle__line" />
        </button>

        <NavBar isOpen={navOpen} onNavigate={closeNav} />

        <div className="header-actions">
          <Button variant="ghost" type="button">
            Log in
          </Button>
          <Button variant="primary" type="button">
            Get started
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
