function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <span className="brand-mark brand-mark--mini" aria-hidden="true">
            ✓
          </span>
          <div>
            <div className="site-footer__title">Taskflow</div>
            <p className="site-footer__subtitle">
              Built with React &amp; Vite
            </p>
          </div>
        </div>

        <nav className="site-footer__links" aria-label="Footer links">
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            React docs
          </a>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            Vite guide
          </a>
          <a href="https://github.com/NorintRos/react-todo-app" target="_blank" rel="noreferrer">
            GitHub repo
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
