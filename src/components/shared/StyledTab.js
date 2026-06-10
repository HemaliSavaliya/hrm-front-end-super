/** @module StyledTab — Styled MUI Tab and TabName components used across tabbed pages. */
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

/**
 * MUI Tab with bold active state and responsive min-width.
 */
export const Tab = styled(MuiTab)(({ theme }) => ({
  lineHeight: 1,
  '&.Mui-selected': { fontWeight: 800 },
  [theme.breakpoints.down('md')]: { minWidth: 100 },
  [theme.breakpoints.down('sm')]: { minWidth: 67 }
}))

/**
 * Span that displays the tab label text; hidden below the md breakpoint.
 */
export const TabName = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: { display: 'none' }
}))
