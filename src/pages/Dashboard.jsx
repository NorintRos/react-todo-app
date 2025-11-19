import { useMemo, useState } from 'react'
import TaskForm from '../components/tasks/TaskForm.jsx'
import TaskFilters from '../components/tasks/TaskFilters.jsx'
import TaskList from '../components/tasks/TaskList.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function DashboardPage() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks()
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingTask, setEditingTask] = useState(null)

  const handleSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
      setEditingTask(null)
    } else {
      addTask(taskData)
    }
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesPriority =
        priorityFilter === 'all' || (task.priority ?? 'medium') === priorityFilter
      const matchesCategory =
        !categoryFilter || (task.category ?? '').toLowerCase().includes(categoryFilter.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || (statusFilter === 'completed' ? task.completed : !task.completed)

      return matchesPriority && matchesCategory && matchesStatus
    })
  }, [tasks, priorityFilter, categoryFilter, statusFilter])

  return (
    <section className="dashboard-page">
      <div className="dashboard-grid">
        <div className="dashboard-column dashboard-column--form">
          <h2>{editingTask ? 'Edit task' : 'Add a new task'}</h2>
          <TaskForm
            onSubmit={handleSubmit}
            initialValues={editingTask}
            submitLabel={editingTask ? 'Save changes' : 'Add Task'}
            onCancel={() => setEditingTask(null)}
          />
        </div>

        <div className="dashboard-column dashboard-column--list">
          <header className="dashboard-column__header">
            <h2>Tasks</h2>
            <TaskFilters
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </header>

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskCompletion}
            onEditTask={setEditingTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
