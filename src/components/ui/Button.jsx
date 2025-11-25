/**
 * Reusable button component to keep styling consistent across the app.
 * Supports variants, sizes, and full-width layout while forwarding other props.
 */
function Button({
  as: Component = 'button',
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

export default Button