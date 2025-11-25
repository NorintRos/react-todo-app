import { createContext, useContext, useState, useMemo } from 'react'

const SettingsContext = createContext(undefined)

const defaultSettings = {
  theme: 'light',
  defaultFilter: 'all',
  username: 'Guest',
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)

  const updateSettings = (updates) => {
    setSettings((prev) => ({ ...prev, ...updates }))
  }

  useEffect(() => {
    try {
      localStorage.setItem('settings', JSON.stringify(settings))
    } catch {
      // ignore persistence errors
    }
  }, [settings])

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
