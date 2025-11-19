import TaskList from '../components/tasks/TaskList.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function TodayPage() {
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks()
  const today = new Date().toISOString().split('T')[0]

  const todayTasks = tasks.filter((task) => task.dueDate === today)

  return (
    <section className="today-page">
      <header>
        <h1>Today</h1>
        <p>Tasks scheduled for today ({today}).</p>
      </header>

      <TaskList
        tasks={todayTasks}
        onToggleComplete={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onEditTask={() => {}}
      />
    </section>
  )
}

export default TodayPage
