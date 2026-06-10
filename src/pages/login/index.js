/** @module LoginPage — Public page that renders the login card on a blank layout. */
import { Box } from '@mui/material'
import { Toaster } from 'react-hot-toast'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import LoginForm from 'src/views/auth/LoginForm'

/**
 * Renders the centered login card and footer illustration.
 * @returns {JSX.Element}
 */
const LoginPage = () => (
  <Box className='content-center'>
    <Toaster />
    <LoginForm />
    <FooterIllustrationsV1 />
  </Box>
)

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
