import TaskItem from './TaskItem.jsx'

function TaskList({ tasks = [], onToggleComplete, onEditTask, onDeleteTask }) {
  if (!tasks.length) {
    return (
      <p className="task-list__empty" aria-live="polite" role="status">
        No tasks to display.
      </p>
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
