/** @module navigation/vertical — Sidebar navigation items for the super admin panel. */
import {
  ComputerDesk03Icon,
  DashboardSquare02Icon,
  ManagerIcon,
  FileAttachmentIcon,
  BarChartIcon,
  TextSquareIcon,
  Megaphone01Icon,
  Settings01Icon,
  UserSwitchIcon,
  ShieldUserIcon
} from 'hugeicons-react'


/**
 * Returns the ordered list of navigation items rendered in the vertical sidebar.
 * Each item maps to a Next.js page route.
 * @returns {Array<{ title: string, icon: Component, path: string }>}
 */
const navigation = () => [
  {
    title: 'Dashboard',
    icon: DashboardSquare02Icon,
    path: '/dashboard'
  },
  {
    title: 'Company',
    icon: ComputerDesk03Icon,
    path: '/company'
  },
  {
    title: 'Admin',
    icon: ManagerIcon,
    path: '/admin'
  },
  {
    title: 'Plans',
    icon: FileAttachmentIcon,
    path: '/plans'
  },
  {
    title: 'Reports',
    icon: BarChartIcon,
    path: '/reports'
  },
  {
    title: 'Audit Logs',
    icon: TextSquareIcon,
    path: '/audit-logs'
  },
  {
    title: 'Announcements',
    icon: Megaphone01Icon,
    path: '/announcements'
  },
  {
    title: 'Impersonation',
    icon: UserSwitchIcon,
    path: '/impersonation'
  },
  {
    title: 'Roles',
    icon: ShieldUserIcon,
    path: '/roles'
  },
  {
    title: 'Settings',
    icon: Settings01Icon,
    path: '/account-settings'
  }
]

export default navigation
