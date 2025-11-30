import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'

function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Log in</h1>
        <p className="auth-subtitle">
          Placeholder login screen so we have a dedicated spot for authentication. Replace this copy
          with your real auth flow whenever you are ready.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" placeholder="••••••••" autoComplete="current-password" />
          </label>
          <Button type="submit" variant="primary" fullWidth>
            Log in
          </Button>
        </form>

        <p className="auth-footnote">
          No account yet?{' '}
          <Link to="/get-started" className="auth-link">
            Get started
          </Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage
