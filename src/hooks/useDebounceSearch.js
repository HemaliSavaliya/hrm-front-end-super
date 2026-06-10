/**
 * @module useDebounceSearch
 * Debounces a search input and propagates the value to a parent setter after the delay.
 *
 * Usage pattern:
 *   const { search, handleSearchChange } = useDebounceSearch(setSearch)
 *
 * When the user types, `setSearch` is called after `delay` ms. The parent hook's
 * search state change then triggers a useEffect re-fetch — keeping data-flow
 * uni-directional (state drives fetch, not the other way around).
 */
import { useState } from 'react'

/**
 * @param {Function} setSearchFn - Setter from the parent hook (e.g. hookData.setSearch).
 *                                  Called with the debounced input value.
 * @param {number}   [delay=300]  - Debounce delay in milliseconds.
 * @returns {{ search: string, handleSearchChange: Function }}
 */
const useDebounceSearch = (setSearchFn, delay = 300) => {
  // ── Local state for the controlled input value ─────────────────────────
  const [inputValue, setInputValue] = useState('')
  const [debounceTimer, setDebounceTimer] = useState(null)

  // ── Handler ────────────────────────────────────────────────────────────
  const handleSearchChange = event => {
    const value = event.target.value
    setInputValue(value)

    // Cancel the previous timer so we only fire once the user stops typing
    if (debounceTimer) clearTimeout(debounceTimer)

    // After the delay, update the parent search state which triggers a re-fetch
    setDebounceTimer(setTimeout(() => setSearchFn(value), delay))
  }

  // ── Return ─────────────────────────────────────────────────────────────
  return { search: inputValue, handleSearchChange }
}

export default useDebounceSearch
