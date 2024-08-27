// ** Icon imports
import AccountTie from 'mdi-material-ui/AccountTie'
import OfficeBuildingOutline from 'mdi-material-ui/OfficeBuildingOutline'

const navigation = () => {
  return [
    {
      title: 'Company',
      icon: OfficeBuildingOutline,
      path: '/'
    },
    {
      title: 'Admin',
      icon: AccountTie,
      path: '/admin'
    }
  ]
}

export default navigation
