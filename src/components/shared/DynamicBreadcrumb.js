/** @module DynamicBreadcrumb — Auto-generates breadcrumb trail from the current URL path. */
import { Breadcrumbs, Link, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { Home01Icon } from 'hugeicons-react'
import { ROUTE_LABELS, isId, cap } from 'src/utils/routeLabels'

const DynamicBreadcrumb = () => {
  const router = useRouter()
  const theme  = useTheme()

  const segments = router.pathname.split('/').filter(Boolean)

  const crumbs = segments.map((seg, i) => ({
    label:  isId(seg) ? 'Detail' : (ROUTE_LABELS[seg] || cap(seg)),
    path:   '/' + segments.slice(0, i + 1).join('/'),
    isLast: i === segments.length - 1
  }))

  const linkSx = {
    display: 'flex', alignItems: 'center', gap: 0.5,
    color: 'text.secondary', fontSize: 13, fontWeight: 500,
    textDecoration: 'none',
    '&:hover': { color: 'primary.main' }
  }

  const activeSx = {
    fontSize: 13, fontWeight: 700,
    color: theme.palette.text.primary
  }

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.75, color: 'text.disabled' } }}
    >
      {/* ── Home crumb ──────────────────────────────────────────────────── */}
      {crumbs.length > 0 ? (
        <NextLink href='/dashboard' passHref legacyBehavior>
          <Link sx={linkSx}>
            <Home01Icon size={14} />
            Dashboard
          </Link>
        </NextLink>
      ) : (
        <Typography sx={{ ...activeSx, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Home01Icon size={14} />
          Dashboard
        </Typography>
      )}

      {/* ── Dynamic segment crumbs ───────────────────────────────────────── */}
      {crumbs.map(({ label, path, isLast }) =>
        isLast ? (
          <Typography key={path} sx={activeSx}>{label}</Typography>
        ) : (
          <NextLink key={path} href={path} passHref legacyBehavior>
            <Link sx={linkSx}>{label}</Link>
          </NextLink>
        )
      )}
    </Breadcrumbs>
  )
}

export default DynamicBreadcrumb
