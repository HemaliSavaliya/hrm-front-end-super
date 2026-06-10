/** @module toastUtils — Shared toast configuration helpers for react-hot-toast. */

/**
 * Base toast style derived from the MUI theme.
 * @param {object} theme - MUI theme object.
 * @returns {object} Style object for react-hot-toast.
 */
export const toastStyle = theme => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontSize: '15px'
})

/**
 * Config for a success toast.
 * @param {object} theme - MUI theme object.
 * @param {string} [position='top-center'] - Toast position.
 * @returns {object} react-hot-toast options.
 */
export const toastSuccess = (theme, position = 'top-center') => ({
  duration: 2000,
  position,
  style: toastStyle(theme)
})

/**
 * Config for an error toast.
 * @param {object} theme - MUI theme object.
 * @param {string} [position='top-center'] - Toast position.
 * @returns {object} react-hot-toast options.
 */
export const toastError = (theme, position = 'top-center') => ({
  duration: 2000,
  position,
  style: toastStyle(theme)
})
