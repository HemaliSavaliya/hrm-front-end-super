/** @module notificationUtils — Browser notification helpers with localStorage deduplication. */

const STORAGE_KEY = 'sent-notifications'

/**
 * Checks whether a notification was already sent for an admin on a given day threshold.
 * @param {string|number} adminId - Admin identifier.
 * @param {number} daysBeforeExpiry - Day threshold (e.g. 7 or 1).
 * @returns {boolean} True if already sent.
 */
export const isNotificationSent = (adminId, daysBeforeExpiry) => {
  const sentMap = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  return (sentMap[adminId] || []).includes(daysBeforeExpiry)
}

/**
 * Persists a sent notification record so it is not re-fired today.
 * @param {string|number} adminId - Admin identifier.
 * @param {number} daysBeforeExpiry - Day threshold that was notified.
 */
export const saveNotificationSent = (adminId, daysBeforeExpiry) => {
  const sentMap = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  if (!sentMap[adminId]) sentMap[adminId] = []
  sentMap[adminId].push(daysBeforeExpiry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sentMap))
}

/**
 * Clears the sent-notifications map at midnight, then schedules itself recursively.
 * Uses the ms delta between now and 00:00:00 of the next day.
 */
export const clearSentNotificationsAtMidnight = () => {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0) // next midnight
  const delay = midnight.getTime() - now.getTime()

  setTimeout(() => {
    localStorage.removeItem(STORAGE_KEY)
    clearSentNotificationsAtMidnight()
  }, delay)
}

/**
 * Requests browser notification permission if not already granted.
 */
export const checkNotificationPermission = () => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notifications.')
  } else if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') alert('Notification permission denied.')
    })
  }
}
