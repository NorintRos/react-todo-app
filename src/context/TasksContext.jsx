import { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import { useCallback } from "react";

const TasksContext = createContext(undefined);

function getStoredTasks() {
  try {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn(`Failed to parse tasks: ${error.message}`);
    return [];
  }
}

function saveTasks(tasks) {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.warn(`Failed to save tasks: ${error.message}`);
  }
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, [], getStoredTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

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

  const addTask = useCallback(
  (task) => dispatch({ type: "ADD", payload: task }),
  [dispatch]
);

const updateTask = useCallback(
  (id, payload) => dispatch({ type: "UPDATE", id, payload }),
  [dispatch]
);

const deleteTask = useCallback(
  (id) => dispatch({ type: "DELETE", id }),
  [dispatch]
);

const toggleTaskCompletion = useCallback(
  (id) => dispatch({ type: "TOGGLE", id }),
  [dispatch]
);

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
