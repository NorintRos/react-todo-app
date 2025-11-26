import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { useCallback } from 'react'

const SettingsContext = createContext()

const defaultSettings = {
  theme: 'light',
  defaultFilter: 'all',
  username: 'Guest',
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('settings')
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings
    } catch {
      console.warn("Failed to parse settings from localStorage.")
      return defaultSettings
    }
  })

  const updateSettings = useCallback(
  (updates) => setSettings((prev) => ({ ...prev, ...updates })),
  [setSettings]
)

  useEffect(() => {
    try {
      localStorage.setItem('settings', JSON.stringify(settings))
    } catch {
      console.warn("Failed to save settings to localStorage.")
    }
  }, [settings])

  const value = useMemo(
  () => ({ settings, updateSettings }),
  [settings, updateSettings]
)

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
