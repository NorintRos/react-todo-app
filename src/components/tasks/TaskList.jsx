import TaskItem from './TaskItem.jsx'
import Button from '../ui/Button.jsx'

function TaskList({ tasks = [], onToggleComplete, onEditTask, onDeleteTask, onAddNew }) {
  if (!tasks.length) {
    return (
      <div className="task-list__empty" aria-live="polite" role="status">
        <span className="task-list__empty-icon" aria-hidden="true">
          ☁
        </span>
        <div>
          <p className="task-list__empty-title">No tasks to display</p>
          <p className="task-list__empty-copy">Start fresh with a new task to keep your day organized.</p>
        </div>
        <Button variant="primary" type="button" onClick={onAddNew}>
          Add a task
        </Button>
      </div>
    )
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed last
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    // Earliest due date first; undefined last
    if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate)
    if (a.dueDate) return -1
    if (b.dueDate) return 1
    return 0
  })

  return (
    <div className="task-list" aria-live="polite">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  )
}

export default TaskList
