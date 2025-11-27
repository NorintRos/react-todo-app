import { useState } from 'react'
import TaskList from '../components/tasks/TaskList.jsx'
import TaskForm from '../components/tasks/TaskForm.jsx'
import { useTasks } from '../context/TasksContext.jsx'
import { getTodayISO } from '../utils/dateUtils.js'

function TodayPage() {
  const { tasks, toggleTaskCompletion, deleteTask, updateTask } = useTasks()
  const today = getTodayISO()
  const [editingTask, setEditingTask] = useState(null)

  const todayTasks = tasks.filter((task) => task.dueDate === today)

  const handleSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
      setEditingTask(null)
    }
  }

  return (
    <section className="today-page">
      <header>
        <h1>Today</h1>
        <p>Tasks scheduled for today ({today}).</p>
      </header>

      {editingTask && (
        <TaskForm
          onSubmit={handleSubmit}
          initialValues={editingTask}
          submitLabel="Save changes"
          onCancel={() => setEditingTask(null)}
        />
      )}

      <TaskList
        tasks={todayTasks}
        onToggleComplete={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onEditTask={setEditingTask}
      />
    </section>
  )
}

export default TodayPage
