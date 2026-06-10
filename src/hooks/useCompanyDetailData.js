/** @module useCompanyDetailData — Fetches a single company's full detail, subscription history and admins. */
import { useEffect, useState } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_URL

/**
 * @param {string|number} companyId - The company ID from the URL.
 * @returns {{ company, admins, subscriptionHistory, logoUrl, loading }}
 */
const useCompanyDetailData = companyId => {
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const [company, setCompany]                       = useState(null)
  const [admins, setAdmins]                         = useState([])
  const [subscriptionHistory, setSubscriptionHistory] = useState([])
  const [logoUrl, setLogoUrl]                       = useState(null)
  const [loading, setLoading]                       = useState(true)

  const fetchDetail = async () => {
    if (!authToken?.token || !companyId) return
    setLoading(true)
    try {
      const headers = { Authorization: `Bearer ${authToken.token}` }

      const { data } = await axios.get(`${API}/company-detail/${companyId}`, { headers })
      setCompany(data.company)
      setAdmins(data.admins || [])
      setSubscriptionHistory(data.subscriptionHistory || [])

      // Fetch company logo as blob URL
      try {
        const logoRes = await axios.get(`${API}/company-logo/${companyId}`, { responseType: 'arraybuffer' })
        setLogoUrl(URL.createObjectURL(new Blob([new Uint8Array(logoRes.data)], { type: 'image/png' })))
      } catch { setLogoUrl(null) }
    } catch (error) {
      console.error('Error fetching company detail:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDetail() }, [companyId, authToken?.token])

  return { company, admins, subscriptionHistory, logoUrl, loading }
}

export default useCompanyDetailData
