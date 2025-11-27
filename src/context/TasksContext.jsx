import { createContext, useContext, useReducer, useMemo, useEffect } from "react";

const TasksContext = createContext(undefined);

const initialTasks = () => {
  try {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { ...action.payload, id: crypto.randomUUID(), completed: false },
      ];

    case "UPDATE":
      return state.map((t) =>
        t.id === action.id ? { ...t, ...action.payload } : t
      );

    case "DELETE":
      return state.filter((t) => t.id !== action.id);

    case "TOGGLE":
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );

    default:
      return state;
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, [], initialTasks);

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch {
    }
  }, [tasks]);

  const addTask = (task) => dispatch({ type: "ADD", payload: task });
  const updateTask = (id, payload) =>
    dispatch({ type: "UPDATE", id, payload });
  const deleteTask = (id) => dispatch({ type: "DELETE", id });
  const toggleTaskCompletion = (id) => dispatch({ type: "TOGGLE", id });

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskCompletion,
    }),
    [tasks]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
