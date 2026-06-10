/** @module DashboardView — Presentational layout composing all dashboard sections. */
import { Box, Grid } from '@mui/material'
import WelcomeCard      from './components/WelcomeCard'
import AdminBar         from './components/AdminBar'
import CompanyDonut     from './components/CompanyDonut'
import NotificationsPanel from './components/NotificationsPanel'
import RecentCompanies  from './components/RecentCompanies'
import StatCard, { CARDS } from './components/StatCard'

/**
 * Renders the full dashboard: welcome banner → stat cards → charts → table + notifications.
 * @param {{ stats, recentCompanies, notifications, loading, onDeleteNotification }} props
 */
const DashboardView = ({ stats, recentCompanies, notifications, loading, onDeleteNotification }) => (
  <Box>
    {/* ── Welcome banner ──────────────────────────────────────────────── */}
    <WelcomeCard stats={stats} loading={loading} />

    {/* ── HRM-style stat cards ────────────────────────────────────────── */}
    <Grid container spacing={3} mb={3}>
      {CARDS.map(card => (
        <Grid item xs={12} sm={6} xl={3} key={card.key}>
          <StatCard card={card} stats={stats} loading={loading} />
        </Grid>
      ))}
    </Grid>

    {/* ── Charts row ──────────────────────────────────────────────────── */}
    <Grid container spacing={3} mb={3}>
      <Grid item xs={12} md={8}>
        <AdminBar stats={stats} loading={loading} />
      </Grid>
      <Grid item xs={12} md={4}>
        <CompanyDonut stats={stats} loading={loading} />
      </Grid>
    </Grid>

    {/* ── Recent companies table + expiry notifications ────────────────── */}
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <RecentCompanies companies={recentCompanies} loading={loading} />
      </Grid>
      <Grid item xs={12} md={5}>
        <NotificationsPanel notifications={notifications} onDelete={onDeleteNotification} loading={loading} />
      </Grid>
    </Grid>
  </Box>
)

export default DashboardView
