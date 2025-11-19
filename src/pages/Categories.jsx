import { useMemo, useState } from 'react'
import TaskList from '../components/tasks/TaskList.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function CategoriesPage() {
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks()
  const [selectedCategory, setSelectedCategory] = useState('')

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

      <TaskList
        tasks={filteredTasks}
        onToggleComplete={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onEditTask={() => {}}
      />
    </section>
  )
}

export default CategoriesPage
