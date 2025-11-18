import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">
        <section className="hero">
          <div className="hero-body">
            <p className="eyebrow">React Todo App Blueprint</p>
            <h1>Organize tasks, stay on track, and ship together.</h1>
            <p className="lede">
              This starter layout gives your team a clean shell: header, nav, and footer are wired
              up so you can focus on building the task pages and context logic next.
            </p>
            <div className="hero-actions">
              <button className="btn primary">Add a task</button>
              <button className="btn ghost">View today</button>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card__header">
              <p className="label">Sample Tasks</p>
              <span className="pill success">3 due</span>
            </div>
            <ul className="tasks-preview">
              <li>
                <span className="dot high" />
                Finish routing setup
                <span className="meta">Due today</span>
              </li>
              <li>
                <span className="dot medium" />
                Design TaskItem component
                <span className="meta">Tomorrow</span>
              </li>
              <li>
                <span className="dot low" />
                Draft project report
                <span className="meta">Friday</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="grid">
          <div className="card">
            <p className="label">Phase 1</p>
            <h2>Layout & styling</h2>
            <p className="muted">
              Header, navigation, footer, and base styles are ready. Drop in your pages as you build them.
            </p>
          </div>
          <div className="card">
            <p className="label">Next</p>
            <h2>Contexts & pages</h2>
            <p className="muted">
              Add `TasksContext`, `SettingsContext`, and wire routes
            </p>
          </div>
          <div className="card">
            <p className="label">Deployment</p>
            <h2>Vercel</h2>
            <p className="muted">
              Keep it static
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
