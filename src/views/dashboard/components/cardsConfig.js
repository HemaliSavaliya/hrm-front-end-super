/** @module cardsConfig — Static configuration for HRM-style dashboard stat cards. */
import { Alert02Icon, Building04Icon, CheckmarkCircle01Icon, ManagerIcon } from 'hugeicons-react'

/**
 * Each entry describes one stat card.
 * - color:   Avatar background colour (HRM palette)
 * - primary: fn(stats) → main display value (e.g. "12/15")
 * - sub:     fn(stats) → secondary label shown after the value (or null)
 * - pct:     fn(stats) → numeric percentage change (positive = green, negative = red, null = hidden)
 * - path:    "View Details" href
 */
const CARDS = [
  {
    key:     'totalCompanies',
    label:   'Total Companies',
    color:   '#F26522',
    icon:    Building04Icon,
    primary: s => `${s.activeCompanies}/${s.totalCompanies}`,
    sub:     _s => null,
    pct:     s  => s.totalCompanies ? +((s.activeCompanies / s.totalCompanies) * 100).toFixed(1) : null,
    path:    '/company'
  },
  {
    key:     'activeCompanies',
    label:   'Active Companies',
    color:   '#3F7FBF',
    icon:    CheckmarkCircle01Icon,
    primary: s => s.activeCompanies,
    sub:     _s => null,
    pct:     s  => s.totalCompanies ? +((s.activeCompanies / s.totalCompanies) * 100).toFixed(1) : null,
    path:    '/company'
  },
  {
    key:     'totalAdmins',
    label:   'Total Admins',
    color:   '#E91E8C',
    icon:    ManagerIcon,
    primary: s => `${s.activeAdmins}/${s.totalAdmins}`,
    sub:     _s => null,
    pct:     s  => s.totalAdmins ? +((s.activeAdmins / s.totalAdmins) * 100).toFixed(1) : null,
    path:    '/admin'
  },
  {
    key:     'expiringCount',
    label:   'Expiring Soon',
    color:   '#424242',
    icon:    Alert02Icon,
    primary: s => s.expiringCount,
    sub:     s  => s.expiringCount > 0 ? 'Needs attention' : null,
    pct:     _s => null,
    path:    '/company'
  }
]

export default CARDS
