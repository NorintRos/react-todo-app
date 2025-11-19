function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  if (!task) return null

  const handleToggle = () => {
    onToggleComplete?.(task.id)
  }

  const handleEdit = () => {
    onEdit?.(task)
  }

  const handleDelete = () => {
    onDelete?.(task.id)
  }

  return (
    <article className={`task-item ${task.completed ? 'is-complete' : ''}`}>
      <header>
        <h3>{task.title}</h3>
        <span className={`status-badge status-${task.completed ? 'done' : 'pending'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </header>

      {task.description && <p className="task-item__description">{task.description}</p>}

      <dl className="task-item__meta">
        {task.dueDate && (
          <div>
            <dt>Due</dt>
            <dd>{task.dueDate}</dd>
          </div>
        )}
        <div>
          <dt>Priority</dt>
          <dd className={`priority-${task.priority}`}>{task.priority}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{task.category || 'general'}</dd>
        </div>
      </dl>

      <div className="task-item__actions">
        <button className="btn ghost" type="button" onClick={handleToggle}>
          {task.completed ? 'Uncomplete' : 'Complete'}
        </button>
        <button className="btn" type="button" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn danger" type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskItem
