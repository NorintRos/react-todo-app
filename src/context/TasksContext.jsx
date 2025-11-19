import { createContext, useContext, useState, useMemo } from 'react'

const TasksContext = createContext(undefined)

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, { ...newTask, id: crypto.randomUUID(), completed: false }])
  }

  const updateTask = (taskId, updates) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)))
  }

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask, toggleTaskCompletion }),
    [tasks]
  )

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return context
}
