import Link from 'next/link'
import { Button, Typography, Box, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}))

const Error401 = () => {
  const theme = useTheme()
  
  return (
    <Box className='content-center'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          {/* <Typography variant='h1'>401</Typography> */}
          <Typography
            variant='h4'
            sx={{ mb: 1, textTransform: 'capitalize', fontWeight: 800, color: theme.palette.primary.main }}
          >
            You are not authorized! 🔐
          </Typography>
          <Typography pt={3} fontSize={18}>
            You don&prime;t have permission to access this page. Go Home!
          </Typography>
        </BoxWrapper>
        <Img height='430' alt='error-illustration' src='/images/pages/permission.png' />
        <Link passHref href='/login'>
          <Button
            component='a'
            variant='contained'
            sx={{
              px: 5.5,
              '&.MuiButton-root:hover': {
                backgroundColor: theme.palette.primary.hover
              }
            }}
          >
            Back to Home
          </Button>
        </Link>
      </Box>
      <FooterIllustrations />
    </Box>
  )
}
Error401.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error401
