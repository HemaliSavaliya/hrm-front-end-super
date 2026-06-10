/** @module _app — Next.js custom App component with auth guard and theme provider. */
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import setupAxiosInterceptors from 'src/utils/axiosConfig'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'

/** Routes accessible without a valid auth token. */
const PUBLIC_PATHS = ['/login', '/forgot-password', '/reset-password', '/401']

/**
 * Decodes the JWT payload (without signature verification) and checks whether
 * the token has passed its `exp` (expiry) timestamp.
 * @param {string} token - Raw JWT string from localStorage.
 * @returns {boolean} True if the token is expired or malformed.
 */
const isTokenExpired = token => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return Date.now() >= payload.exp * 1000
  } catch {
    // Malformed token — treat as expired
    return true
  }
}

// ── Route-transition progress bar ─────────────────────────────────────────
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeError', () => NProgress.done())
  Router.events.on('routeChangeComplete', () => NProgress.done())
}

// Register the global 401 interceptor once at module load time
setupAxiosInterceptors()

/**
 * Root application component — wraps every page with auth guard and theme provider.
 * @param {{ Component, pageProps }} props
 * @returns {JSX.Element}
 */
const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
  const router = useRouter()
  const [, setAuthorized] = useState(false)

  // ── Auth guard — runs on every route change ────────────────────────────
  useEffect(() => {
    const loginDetails = JSON.parse(localStorage.getItem('login-details'))
    const tokenValid = loginDetails?.token && !isTokenExpired(loginDetails.token)

    if (tokenValid) {
      setAuthorized(true)
    } else {
      // Remove stale/expired token so it doesn't cause silent API failures
      if (loginDetails) localStorage.removeItem('login-details')
      setAuthorized(false)
      if (!PUBLIC_PATHS.includes(router.pathname)) router.push('/login')
    }
  }, [router, router.pathname])

  return (
    <>
      <Head>
        <title>HRM (Super Admin)</title>
        <meta name='description' content='Dashboard' />
        <meta name='keywords' content='HRM Super Admin Dashboard' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => (
            <ThemeComponent settings={settings}>
              {getLayout(<Component {...pageProps} />)}
            </ThemeComponent>
          )}
        </SettingsConsumer>
      </SettingsProvider>
    </>
  )
}

export default App
