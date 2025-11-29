const formatLocalISODate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const parseISODateToLocal = (isoDate) => {
  if (!isoDate) return null
  const [year, month, day] = isoDate.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

export const getTodayISO = () => formatLocalISODate(new Date())

export const describeDueDate = (dueDate) => {
  if (!dueDate) return { label: 'No due date', status: 'none' }

  const todayDate = parseISODateToLocal(getTodayISO())
  const due = parseISODateToLocal(dueDate)

  if (!todayDate || !due) return { label: 'No due date', status: 'none' }

  const diffMs = due.setHours(0, 0, 0, 0) - todayDate.setHours(0, 0, 0, 0)
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return { label: 'Today', status: 'today' }
  if (diffDays === 1) return { label: 'Tomorrow', status: 'upcoming' }
  if (diffDays < 0) return { label: `Overdue by ${Math.abs(diffDays)}d`, status: 'overdue' }
  return { label: `In ${diffDays}d`, status: 'upcoming' }
}
