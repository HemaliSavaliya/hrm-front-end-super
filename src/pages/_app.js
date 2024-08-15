import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../../styles/globals.css'

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  // For user in already login or not
  const router = useRouter()
  const [, setAuthorized] = useState(false)
  const [, setLoading] = useState(true)

  useEffect(() => {
    // Check for the presence of a token after the initial render
    const loginToken = JSON.parse(localStorage.getItem('login-details'))

    if (loginToken?.token) {
      setAuthorized(true)
    } else {
      setAuthorized(false)

      // Check if not already on the sign-in or error pages before redirecting
      if (
        router.pathname !== '/login' &&
        router.pathname !== '/forgot-password' &&
        router.pathname !== '/reset-password' &&
        router.pathname !== '/500' &&
        router.pathname !== '/401'
      ) {
        router.push('/login')
      }
    }

    setLoading(false) // Set loading to false after the initial render
  }, [router, router.pathname])

  return (
    <>
      <Head>
        <title>HRM (Super Admin)</title>
        <meta name='description' content='Dashboard' />
        <meta name='keywords' content='HRM Super Admin Dashboard' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        {/* <link rel="icon" href="/favicon.png" /> */}
      </Head>

      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </>
  )
}

export default App