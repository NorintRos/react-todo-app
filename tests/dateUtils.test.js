import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { describeDueDate, getTodayISO } from '../src/utils/dateUtils.js'

describe('dateUtils', () => {
  it('getTodayISO returns YYYY-MM-DD', () => {
    const today = getTodayISO()
    assert.match(today, /^\d{4}-\d{2}-\d{2}$/)
    const parsed = new Date(today)
    assert.ok(!Number.isNaN(parsed.getTime()))
  })

  it('describeDueDate labels today correctly', () => {
    const today = getTodayISO()
    const { label, status } = describeDueDate(today)
    assert.equal(label, 'Today')
    assert.equal(status, 'today')
  })

  it('describeDueDate labels upcoming and overdue', () => {
    const today = new Date(getTodayISO())
    const oneDayMs = 24 * 60 * 60 * 1000

    const tomorrowISO = new Date(today.getTime() + oneDayMs).toISOString().slice(0, 10)
    const { status: upcomingStatus } = describeDueDate(tomorrowISO)
    assert.equal(upcomingStatus, 'upcoming')

    const yesterdayISO = new Date(today.getTime() - oneDayMs).toISOString().slice(0, 10)
    const { status: overdueStatus } = describeDueDate(yesterdayISO)
    assert.equal(overdueStatus, 'overdue')
  })
})
