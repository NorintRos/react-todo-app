/**
 * Simple card container with padding and subtle border/shadow.
 * Accepts an optional title and description for common card layouts.
 */
function Card({ title, description, children, className = '', ...props }) {
  const classes = ['card', className].filter(Boolean).join(' ')

  return (
    <section className={classes} {...props}>
      {(title || description) && (
        <header className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {description && <p className="card__description">{description}</p>}
        </header>
      )}
      <div className="card__body">{children}</div>
    </section>
  )
}

export default Card