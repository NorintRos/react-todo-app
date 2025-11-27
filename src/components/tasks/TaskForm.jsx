import { useEffect, useState } from 'react'
import { getTodayISO } from '../../utils/dateUtils.js'
import Button from '../ui/Button.jsx'

const defaultState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  category: 'general',
}

const buildInitialState = (initialValues) => ({
  title: initialValues?.title ?? defaultState.title,
  description: initialValues?.description ?? defaultState.description,
  dueDate: initialValues?.dueDate ?? defaultState.dueDate,
  priority: initialValues?.priority ?? defaultState.priority,
  category: initialValues?.category ?? defaultState.category,
})

function TaskForm({ onSubmit, initialValues, submitLabel = 'Add Task', onCancel }) {
  const [formState, setFormState] = useState(() => buildInitialState(initialValues))
  const todayISO = getTodayISO()

  useEffect(() => {
    setFormState(buildInitialState(initialValues))
  }, [initialValues])

  const updateField = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formState.title.trim()) return
    if (formState.dueDate && formState.dueDate < todayISO) {
      // Block past due dates for clarity
      return
    }

    onSubmit?.({
      title: formState.title.trim(),
      description: formState.description.trim(),
      dueDate: formState.dueDate,
      priority: formState.priority,
      category: formState.category.trim(),
    })

    if (!initialValues) {
      setFormState(buildInitialState())
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__fields">
        <label>
          <span>Title</span>
          <input
            type="text"
            value={formState.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="Add a task title"
            required
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            value={formState.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Optional details"
          />
        </label>

        <label>
          <span>Due date</span>
          <input
            type="date"
            value={formState.dueDate}
            onChange={(event) => updateField('dueDate', event.target.value)}
            min={todayISO}
          />
        </label>

        <label>
          <span>Priority</span>
          <select value={formState.priority} onChange={(event) => updateField('priority', event.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          <span>Category</span>
          <input
            type="text"
            value={formState.category}
            onChange={(event) => updateField('category', event.target.value)}
            placeholder="General"
          />
        </label>
      </div>

      <div className="task-form__actions">
        {onCancel && initialValues && (
          <Button variant="ghost" type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="primary" type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
