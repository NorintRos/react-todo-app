import TaskItem from './TaskItem.jsx'

function TaskList({ tasks = [], onToggleComplete, onEditTask, onDeleteTask }) {
  if (!tasks.length) {
    return <p className="task-list__empty">No tasks to display.</p>
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
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
