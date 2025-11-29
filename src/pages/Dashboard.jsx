/* eslint react-hooks/set-state-in-effect: 0 */
import { useEffect, useMemo, useState } from 'react'
import TaskForm from '../components/tasks/TaskForm.jsx'
import TaskFilters from '../components/tasks/TaskFilters.jsx'
import TaskList from '../components/tasks/TaskList.jsx'
import { useTasks } from '../context/TasksContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { getTodayISO } from '../utils/dateUtils.js'

function DashboardPage() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks()
  const { settings } = useSettings()
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState(() =>
    settings.defaultFilter === 'completed' ? 'completed' : 'all'
  )
  const [dueFilter, setDueFilter] = useState(() =>
    settings.defaultFilter === 'today' ? 'today' : 'all'
  )
  const [editingTask, setEditingTask] = useState(null)

  // Sync filters when the default filter setting changes.
  useEffect(() => {
    if (settings.defaultFilter === 'completed') {
      setStatusFilter('completed')
      setDueFilter('all')
    } else if (settings.defaultFilter === 'today') {
      setDueFilter('today')
      setStatusFilter('all')
    } else {
      setStatusFilter('all')
      setDueFilter('all')
    }
  }, [settings.defaultFilter])

  const handleSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
      setEditingTask(null)
    } else {
      addTask(taskData)
    }
  }

  const filteredTasks = useMemo(() => {
    const today = getTodayISO()

    return tasks.filter((task) => {
      const matchesPriority =
        priorityFilter === 'all' || (task.priority ?? 'medium') === priorityFilter
      const matchesCategory =
        !categoryFilter || (task.category ?? '').toLowerCase().includes(categoryFilter.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || (statusFilter === 'completed' ? task.completed : !task.completed)
      const matchesDue =
        dueFilter === 'all' ||
        (dueFilter === 'today' && Boolean(task.dueDate) && task.dueDate === today)

      return matchesPriority && matchesCategory && matchesStatus && matchesDue
    })
  }, [tasks, priorityFilter, categoryFilter, statusFilter, dueFilter])

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
              dueFilter={dueFilter}
              setDueFilter={setDueFilter}
              onClear={() => {
                setPriorityFilter('all')
                setCategoryFilter('')
                setStatusFilter(
                  settings.defaultFilter === 'completed'
                    ? 'completed'
                    : settings.defaultFilter === 'today'
                    ? 'all'
                    : 'all'
                )
                setDueFilter(settings.defaultFilter === 'today' ? 'today' : 'all')
              }}
            />
          </header>

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskCompletion}
            onEditTask={setEditingTask}
            onDeleteTask={deleteTask}
            onAddNew={() => {
              document.getElementById('task-title')?.focus()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
