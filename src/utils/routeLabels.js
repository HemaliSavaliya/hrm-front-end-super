/** @module routeLabels — Shared map of URL path segments → human-readable page labels. */

export const ROUTE_LABELS = {
  dashboard:          'Dashboard',
  company:            'Company',
  admin:              'Admin',
  plans:              'Plans',
  reports:            'Reports',
  'audit-logs':       'Audit Logs',
  announcements:      'Announcements',
  impersonation:      'Impersonation',
  roles:              'Roles',
  'account-settings': 'Account Settings',
  settings:           'Settings',
}

/** Returns true when a segment looks like a numeric id or UUID. */
export const isId = seg => /^\d+$/.test(seg) || /^[0-9a-f-]{8,}$/i.test(seg)

/** Capitalises and de-hyphenates a segment as a last-resort label. */
export const cap = s => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ')

/**
 * Derives the human-readable label for the CURRENT (last) path segment.
 * e.g. "/company/42" → "Company Detail"
 *      "/audit-logs"  → "Audit Logs"
 * @param {string} pathname - router.pathname value
 * @returns {string}
 */
export const getPageTitle = pathname => {
  const segments = pathname.split('/').filter(Boolean)
  if (!segments.length) return 'Dashboard'

  const last = segments[segments.length - 1]
  if (isId(last)) {
    // one level up gives the section name; append "Detail"
    const parent = segments[segments.length - 2]
    return `${ROUTE_LABELS[parent] || cap(parent)} Detail`
  }

  return ROUTE_LABELS[last] || cap(last)
}
