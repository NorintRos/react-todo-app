import { useEffect, useState } from 'react'

const defaultState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  category: 'general',
}

function TaskForm({ onSubmit, initialValues, submitLabel = 'Add Task', onCancel }) {
  const [formState, setFormState] = useState(defaultState)

  useEffect(() => {
    if (initialValues) {
      setFormState({
        title: initialValues.title ?? '',
        description: initialValues.description ?? '',
        dueDate: initialValues.dueDate ?? '',
        priority: initialValues.priority ?? 'medium',
        category: initialValues.category ?? 'general',
      })
    } else {
      setFormState(defaultState)
    }
  }, [initialValues])

  const updateField = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formState.title.trim()) return

    onSubmit?.({
      title: formState.title.trim(),
      description: formState.description.trim(),
      dueDate: formState.dueDate,
      priority: formState.priority,
      category: formState.category,
    })

    if (!initialValues) {
      setFormState(defaultState)
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
          <button className="btn ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="btn primary" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
