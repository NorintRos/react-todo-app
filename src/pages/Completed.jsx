import { useState } from 'react'
import TaskList from '../components/tasks/TaskList.jsx'
import TaskForm from '../components/tasks/TaskForm.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function CompletedPage() {
  const { tasks, toggleTaskCompletion, deleteTask, updateTask } = useTasks()
  const completedTasks = tasks.filter((task) => task.completed)
  const [editingTask, setEditingTask] = useState(null)

  const handleSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
      setEditingTask(null)
    }
  }

  return (
    <section className="completed-page">
      <header>
        <h1>Completed</h1>
        <p>All tasks you have finished.</p>
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
        tasks={completedTasks}
        onToggleComplete={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onEditTask={setEditingTask}
      />
    </section>
  )
}

export default CompletedPage
