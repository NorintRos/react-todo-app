/* eslint react-hooks/set-state-in-effect: 0 */
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TaskForm from '../components/tasks/TaskForm.jsx'
import TaskFilters from '../components/tasks/TaskFilters.jsx'
import TaskList from '../components/tasks/TaskList.jsx'
import Button from '../components/ui/Button.jsx'
import { useTasks } from '../context/TasksContext.jsx'
import { useSettings } from '../context/SettingsContext.jsx'
import { getTodayISO } from '../utils/dateUtils.js'

function DashboardPage() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } = useTasks()
  const { settings } = useSettings()
  const location = useLocation()
  const navigate = useNavigate()
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState(() =>
    settings.defaultFilter === 'completed' ? 'completed' : 'all'
  )
  const [dueFilter, setDueFilter] = useState(() =>
    settings.defaultFilter === 'today' ? 'today' : 'all'
  )
  const [editingTask, setEditingTask] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

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
      setIsAdding(false)
    } else {
      addTask(taskData)
      setIsAdding(false)
    }
  }

  const startNewTask = () => {
    setEditingTask(null)
    setIsAdding(true)
    requestAnimationFrame(() => {
      document.getElementById('task-title')?.focus()
    })
  }

  useEffect(() => {
    if (location.state?.startNew) {
      startNewTask()
      navigate('.', { replace: true, state: {} })
    }
  }, [location.state?.startNew, navigate])

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
        <div className="dashboard-column dashboard-column--list">
          <header className="dashboard-column__header dashboard-column__header--list">
            <div>
              <h2>Tasks</h2>
              <p>Filter, add, and manage everything in one place.</p>
            </div>
            <div className="dashboard-column__actions">
              <Button variant="primary" type="button" onClick={startNewTask}>
                Add a new task
              </Button>
            </div>
          </header>

          {(isAdding || editingTask) && (
            <div className="dashboard-inline-form">
              <div className="dashboard-inline-form__header">
                <h3>{editingTask ? 'Edit task' : 'Add a new task'}</h3>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    setEditingTask(null)
                    setIsAdding(false)
                  }}
                >
                  Close
                </Button>
              </div>
              <TaskForm
                onSubmit={handleSubmit}
                initialValues={editingTask}
                submitLabel={editingTask ? 'Save changes' : 'Add Task'}
                onCancel={() => {
                  setEditingTask(null)
                  setIsAdding(false)
                }}
              />
            </div>
          )}

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

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskCompletion}
            onEditTask={(task) => {
              setEditingTask(task)
              setIsAdding(true)
            }}
            onDeleteTask={deleteTask}
            onAddNew={startNewTask}
          />
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
