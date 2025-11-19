import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TasksProvider } from './context/TasksContext.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'

const container = document.getElementById('root')
createRoot(container).render(
  <StrictMode>
    <SettingsProvider>
      <TasksProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TasksProvider>
    </SettingsProvider>
  </StrictMode>
)
