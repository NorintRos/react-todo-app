import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>Page not found</h1>
      <p>We couldn't find the page you're looking for. Try heading back to the dashboard.</p>
      <Button as={Link} to="/" variant="primary">
        Back to home
      </Button>
    </section>
  )
}

export default NotFoundPage