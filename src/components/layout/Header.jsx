import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import Button from '../ui/Button.jsx'
import { useSettings } from '../../context/SettingsContext.jsx'

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M12 3v2.5M12 18.5V21M4.5 12H2M22 12h-2.5M5.6 5.6 4 4M20 20l-1.6-1.6M18.4 5.6 20 4M4 20l1.6-1.6" />
  </svg>
)

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M20 14.5A8.5 8.5 0 0 1 10.5 5a8.52 8.52 0 0 0 0 14A8.5 8.5 0 0 0 20 14.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M4 7h16M4 12h16M10 17h10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)

function Header() {
  const [navOpen, setNavOpen] = useState(false)
  const { settings, updateSettings } = useSettings()
  const toggleNav = () => setNavOpen((open) => !open)
  const closeNav = () => setNavOpen(false)
  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <div className="brand">
            <span className="brand-mark">✓</span>
            <div>
              <div>Taskflow</div>
              <small className="brand__subtitle">React Todo</small>
            </div>
          </div>

          <NavBar isOpen={navOpen} onNavigate={closeNav} />

          <div className="header-actions">
            <Button variant="ghost" type="button" onClick={toggleTheme} aria-label="Toggle theme">
              {settings.theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </Button>
            <Button as={NavLink} to="/login" variant="ghost" type="button">
              Log in
            </Button>
            <Button as={NavLink} to="/get-started" variant="primary" type="button">
              Get started
            </Button>
          </div>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            onClick={toggleNav}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="nav-toggle__label">Menu</span>
            <span className="nav-toggle__icon">
              <MenuIcon />
            </span>
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
