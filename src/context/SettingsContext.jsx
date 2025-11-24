import { createContext, useContext, useState, useMemo, useEffect } from 'react'

const SettingsContext = createContext(undefined)

const defaultSettings = {
  theme: 'light',
  defaultFilter: 'all',
  username: 'Guest',
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('settings')
      return stored ? JSON.parse(stored) : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  const updateSettings = (updates) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  const value = useMemo(() => ({ settings, updateSettings }), [settings])

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}