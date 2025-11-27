import { useMemo, useState } from 'react'
import TaskList from '../components/tasks/TaskList.jsx'
import TaskForm from '../components/tasks/TaskForm.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function CategoriesPage() {
  const { tasks, toggleTaskCompletion, deleteTask, updateTask } = useTasks()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [editingTask, setEditingTask] = useState(null)

  const categories = useMemo(() => {
    const groups = new Set()
    tasks.forEach((task) => {
      if (task.category) groups.add(task.category)
    })
    return Array.from(groups)
  }, [tasks])

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks

  const handleSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
      setEditingTask(null)
    }
  }

  return (
    <section className="categories-page">
      <header>
        <h1>Categories</h1>
        <p>Browse tasks by category.</p>
      </header>

      <div className="categories-controls">
        <label>
          <span>Category</span>
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {editingTask && (
        <TaskForm
          onSubmit={handleSubmit}
          initialValues={editingTask}
          submitLabel="Save changes"
          onCancel={() => setEditingTask(null)}
        />
      )}

      <TaskList
        tasks={filteredTasks}
        onToggleComplete={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onEditTask={setEditingTask}
      />
    </section>
  )
}

export default CategoriesPage
