function TaskFilters({
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  dueFilter,
  setDueFilter,
  onClear,
}) {
  return (
    <div className="task-filters">
      <label>
        <span>Priority</span>
        <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>

      <label>
        <span>Category</span>
        <input
          type="text"
          placeholder="All categories"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        />
      </label>

      <label>
        <span>Due</span>
        <select value={dueFilter} onChange={(event) => setDueFilter(event.target.value)}>
          <option value="all">All</option>
          <option value="today">Today</option>
        </select>
      </label>

      <label>
        <span>Status</span>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <button type="button" className="task-filters__clear" onClick={onClear}>
        Clear filters
      </button>
    </div>
  )
}

export default TaskFilters
