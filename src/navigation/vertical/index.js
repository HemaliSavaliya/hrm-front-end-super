// ** Icon imports
import { AccountTie, HomeAccount, OfficeBuildingOutline } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeAccount,
      path: '/'
    },
    {
      title: 'Company',
      icon: OfficeBuildingOutline,
      path: '/company'
    },
    {
      title: 'Admin',
      icon: AccountTie,
      path: '/admin'
    }
  ]
}

export default navigation
