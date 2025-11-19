import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h1>Page not found</h1>
      <p>We couldn't find the page you're looking for. Try heading back to the dashboard.</p>
      <Link className="btn primary" to="/">
        Back to home
      </Link>
    </section>
  )
}

export default NotFoundPage
