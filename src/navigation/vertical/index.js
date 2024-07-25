// ** Icon imports
import AccountTie from 'mdi-material-ui/AccountTie';
import OfficeBuildingOutline from 'mdi-material-ui/OfficeBuildingOutline';

const navigation = () => {
  return [
    {
      title: 'Admin',
      icon: AccountTie,
      path: '/',
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Company',
      icon: OfficeBuildingOutline,
      path: '/company'
    }
  ]
}

export default navigation