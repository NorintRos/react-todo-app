import { useState } from 'react'

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('general')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim()) return

    onSubmit?.({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      category,
    })

    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('medium')
    setCategory('general')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__fields">
        <label>
          <span>Title</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a task title"
            required
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Optional details"
          />
        </label>

        <label>
          <span>Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </label>

        <label>
          <span>Priority</span>
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          <span>Category</span>
          <input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            placeholder="General"
          />
        </label>
      </div>

      <div className="task-form__actions">
        <button className="btn primary" type="submit">
          Add Task
        </button>
      </div>
    </form>
  )
}

export default TaskForm
