/**
 * @module axiosConfig
 * Registers a global Axios response interceptor that handles 401 Unauthorized
 * responses. When detected (e.g. expired or invalid JWT), it clears the stored
 * login details and redirects the user back to the login page.
 *
 * Import this module once at the app root (_app.js) so the interceptor is
 * active for the entire application lifetime.
 */
import axios from 'axios'
import Router from 'next/router'

/**
 * Attaches the 401 interceptor to the global axios instance.
 * Safe to call multiple times — axios deduplicates interceptor IDs.
 */
const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    // ── Success handler — pass the response through unchanged ──────────────
    response => response,

    // ── Error handler — inspect status and react accordingly ──────────────
    error => {
      const status = error?.response?.status

      if (status === 401) {
        // Token is expired or invalid — clear auth data and force re-login
        localStorage.removeItem('login-details')
        Router.push('/login')
      }

      // Re-reject so individual catch blocks can still handle other errors
      return Promise.reject(error)
    }
  )
}

export default setupAxiosInterceptors
