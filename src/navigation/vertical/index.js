// ** Icon imports
import { ComputerDesk03Icon, DashboardSquare02Icon, ManagerIcon } from 'hugeicons-react'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: DashboardSquare02Icon,
      path: '/'
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
    }
  ]
}

export default navigation
