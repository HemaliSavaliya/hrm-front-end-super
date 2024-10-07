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
        router.pathname !== '/401'
      ) {
        router.push('/login')
      }
    }

    setLoading(false) // Set loading to false after the initial render
  }, [router, router.pathname])

  // useEffect(() => {
  //   console.log('Page loaded, login details:', localStorage.getItem('login-details'))

  //   let isTabClosing = false

  //   // Set a flag to indicate that the page is loaded for this session
  //   sessionStorage.setItem('pageLoaded', 'true')

  //   // Handle browser/tab close event
  //   const handleBeforeUnload = event => {
  //     console.log('Before unload triggered')

  //     // Only clear localStorage if the page is being closed (not refreshed)
  //     if (isTabClosing) {
  //       console.log('Removing login-details because the tab is being closed')

  //       // Remove token only if the page is being closed
  //       localStorage.removeItem('login-details')
  //       sessionStorage.removeItem('pageLoaded')
  //     } else {
  //       console.log('Page is being refreshed, do not clear localStorage')
  //     }
  //   }

  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'hidden') {
  //       // When the document becomes hidden, set the tab closing flag
  //       isTabClosing = true
  //     } else {
  //       // When the document becomes visible again (like switching tabs back), reset the flag
  //       isTabClosing = false
  //     }
  //   }

  //   // Listen for page visibility change and beforeunload events
  //   document.addEventListener('visibilitychange', handleVisibilityChange)
  //   window.addEventListener('beforeunload', handleBeforeUnload)

  //   // Cleanup the event listeners when the component unmounts
  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange)
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //   }
  // }, [])

  // ------ 2nd code -------
  // useEffect(() => {
  //   let isTabClosing = false

  //   // Set a flag to indicate that the page is loaded for this session
  //   sessionStorage.setItem('pageLoaded', 'true')

  //   // Handle browser/tab close event
  //   const handleUnload = () => {
  //     if (isTabClosing) {
  //       // Remove token only if the page is being closed
  //       localStorage.removeItem('login-details')
  //       sessionStorage.removeItem('pageLoaded')
  //     }
  //   }

  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'hidden') {
  //       // When the document becomes hidden, set the tab closing flag
  //       isTabClosing = true
  //     } else {
  //       // When the document becomes visible again (like switching tabs back), reset the flag
  //       isTabClosing = false
  //     }
  //   }

  //   // Listen for the unload event
  //   window.addEventListener('beforeunload', handleUnload)
  //   document.addEventListener('visibilitychange', handleVisibilityChange)

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('beforeunload', handleUnload)
  //     document.removeEventListener('visibilitychange', handleVisibilityChange)
  //   }
  // }, [])

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const pageLoaded = sessionStorage.getItem('pageLoaded')
  //     const token = localStorage.getItem('login-details')

  //     if (pageLoaded === 'true' && !token) {
  //       router.push('/login')
  //     }
  //   }
  // }, []) // Run on mount and when the router changes

  // ------ 3rd code ------
  // useEffect(() => {
  //   // Handle browser/tab close or page refresh event
  //   let isPageRefreshing = false

  //   // Listen for the 'beforeunload' event to detect refresh or tab close
  //   const handleBeforeUnload = () => {
  //     sessionStorage.setItem('isPageRefreshing', 'true') // Store this flag in sessionStorage
  //   }

  //   // Function to handle token removal only on tab close, not refresh
  //   const handleUnload = () => {
  //     // const isPageRefreshingFlag = sessionStorage.getItem('isPageRefreshing')

  //     // Remove token only on tab close, not page refresh
  //     if (!isPageRefreshing) {
  //       localStorage.removeItem('login-details') // Remove token only on tab close, not refresh
  //     }
  //   }

  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'hidden') {
  //       // Set the flag when the tab is closing
  //       isPageRefreshing = false
  //     }
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload)
  //   window.addEventListener('unload', handleUnload)
  //   document.addEventListener('visibilitychange', handleVisibilityChange)

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //     window.removeEventListener('unload', handleUnload)
  //     document.removeEventListener('visibilitychange', handleVisibilityChange)
  //   }
  // }, [])

  // // This handles checking if the page is reloaded and token should be maintained
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const isPageRefreshing = sessionStorage.getItem('isPageRefreshing')
  //     const token = localStorage.getItem('login-details')

  //     if (isPageRefreshing !== 'true' && !token) {
  //       router.push('/login')
  //     }

  //     // Clear the session flag after load
  //     sessionStorage.removeItem('isPageRefreshing')
  //   }
  // }, [])

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
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </>
  )
}

export default App
