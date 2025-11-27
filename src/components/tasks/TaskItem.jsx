import Button from '../ui/Button.jsx'
import { describeDueDate } from '../../utils/dateUtils.js'

function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  if (!task) return null

  const hasEdit = typeof onEdit === 'function'

  const handleToggle = () => {
    onToggleComplete?.(task.id)
  }

  const handleEdit = () => {
    onEdit?.(task)
  }

  const handleDelete = () => {
    onDelete?.(task.id)
  }

  const dueInfo = describeDueDate(task.dueDate)

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
            <dd className={`due due--${dueInfo.status}`}>{dueInfo.label}</dd>
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
        <Button variant="ghost" type="button" onClick={handleToggle}>
          {task.completed ? 'Uncomplete' : 'Complete'}
        </Button>
        {hasEdit && (
          <Button type="button" onClick={handleEdit}>
            Edit
          </Button>
        )}
        <Button variant="danger" type="button" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </article>
  )
}

export default TaskItem
