import { useState } from 'react'
import { useSettings } from '../context/SettingsContext.jsx'
import { defaultSettings } from '../context/settingsDefaults.js'
import Button from '../components/ui/Button.jsx'

function SettingsPage() {
  const { settings, updateSettings } = useSettings()
  const [formValues, setFormValues] = useState(settings)

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateSettings(formValues)
  }

  const handleReset = () => {
    setFormValues(defaultSettings)
  }

  return (
    <section className="settings-page">
      <header>
        <h1>Settings</h1>
        <p>Customize your task experience.</p>
      </header>

      <form className="settings-form" onSubmit={handleSubmit}>
        <label>
          <span>Username</span>
          <input
            type="text"
            value={formValues.username}
            onChange={(event) => handleChange('username', event.target.value)}
          />
        </label>

        <label>
          <span>Theme</span>
          <select value={formValues.theme} onChange={(event) => handleChange('theme', event.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label>
          <span>Default filter</span>
          <select
            value={formValues.defaultFilter}
            onChange={(event) => handleChange('defaultFilter', event.target.value)}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <div className="settings-form__actions">
          <Button variant="ghost" type="button" onClick={handleReset}>
            Reset to defaults
          </Button>
          <Button variant="primary" type="submit">
            Save settings
          </Button>
        </div>
      </form>
    </section>
  )
}

export default SettingsPage
