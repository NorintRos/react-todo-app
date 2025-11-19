import TaskList from '../components/tasks/TaskList.jsx'
import { useTasks } from '../context/TasksContext.jsx'

function CompletedPage() {
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks()
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <section className="completed-page">
      <header>
        <h1>Completed</h1>
        <p>All tasks you have finished.</p>
      </header>

      <TaskList
        tasks={completedTasks}
        onToggleComplete={toggleTaskCompletion}
        onDeleteTask={deleteTask}
        onEditTask={() => {}}
      />
    </section>
  )
}

export default CompletedPage
