/** @module WelcomeCard — Greeting banner with admin name and platform summary counts. */
import { Avatar, Box, Card, CardContent, Link, Skeleton, Typography } from '@mui/material'
import { PencilEdit01Icon } from 'hugeicons-react'

/**
 * @param {{ stats: object, loading: boolean }} props
 */
const WelcomeCard = ({ stats, loading }) => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const name = authToken?.name || 'Super Admin'

  return (
    <Card elevation={0} sx={{ border: 'none', backgroundColor: 'transparent', boxShadow: 'none', mb: 3 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', p: 0, pb: '0px !important' }}>
        <Box display='flex' alignItems='center' gap={2}>
          {/* ── 3D cartoon avatar ── */}
          <Avatar src='/images/avatars/avatar-7.png' sx={{ width: 56, height: 56 }} />

          <Box>
            <Typography fontWeight={600} fontSize={{ xs: 15, sm: 20 }} display='flex' alignItems='center' gap={1.5} mb={0.5}>
              Welcome Back, {name}
              <Link href='/account-settings' sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <PencilEdit01Icon size={16} />
              </Link>
            </Typography>
            <Typography fontSize={{ xs: 12, sm: 14 }} color='text.secondary'>
              {loading ? (
                <Skeleton variant='text' width={260} />
              ) : (
                <>
                  You have{' '}
                  <Link href='/company' color='primary' fontWeight={600}>{stats.activeCompanies}</Link>
                  {' '}Active Companies &amp;{' '}
                  <Link href='/admin' color='primary' fontWeight={600}>{stats.totalAdmins}</Link>
                  {' '}Admins on the platform
                </>
              )}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default WelcomeCard
