import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'

function GetStartedPage() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Quick start</p>
        <h1>Get started</h1>
        <p className="auth-subtitle">
          A placeholder onboarding page to guide people into Taskflow. Swap this out for your real
          sign-up experience when you are ready to ship authentication.
        </p>

        <div className="auth-checklist">
          <div className="auth-checklist__item">
            <span className="auth-checkmark" aria-hidden="true">
              ✓
            </span>
            Create your workspace name and timezone.
          </div>
          <div className="auth-checklist__item">
            <span className="auth-checkmark" aria-hidden="true">
              ✓
            </span>
            Invite teammates and set default categories.
          </div>
          <div className="auth-checklist__item">
            <span className="auth-checkmark" aria-hidden="true">
              ✓
            </span>
            Import your tasks or start fresh with a clean slate.
          </div>
        </div>

        <div className="auth-actions">
          <Button as={Link} to="/login" variant="ghost">
            Log in instead
          </Button>
          <Button variant="primary">Start a new workspace</Button>
        </div>
      </div>
    </section>
  )
}

export default GetStartedPage
