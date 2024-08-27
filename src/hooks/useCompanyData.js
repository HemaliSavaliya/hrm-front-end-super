/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useCompanyData = () => {
  const [companyData, setCompanyData] = useState([])
  const [companyDataIn, setCompanyDataIn] = useState([])
  const [editCompanyId, setEditCompanyId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [logoUrls, setLogoUrls] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadingIn, setLoadingIn] = useState(true)
  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
    setEditCompanyId(null)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleEdit = id => {
    setEditCompanyId(id)
    setOpen(true)
  }

  const fetchData = async () => {
    setLoading(true)
    setLoadingIn(true)

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      const activeCompanies = response.data.filter(del => del.deleted === 0)
      const inactiveCompanies = response.data.filter(del => del.deleted === 1)

      setCompanyData(activeCompanies)
      setCompanyDataIn(inactiveCompanies)
    } catch (error) {
      console.error('Error fetching Company', error)
    } finally {
      setLoading(false)
      setLoadingIn(false)
    }
  }

  useEffect(() => {
    if (authToken?.token) {
      fetchData()
    }
  }, [authToken?.token])

  // Function to add form data to localStorage
  const addCompany = async newCompany => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-company`,
        {
          ...newCompany
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Check the success status from the API response
      if (response.data) {
        toast.success('Company Added Successful!', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '15px'
          }
        })

        setTimeout(async () => {
          // Instead of relying on the previous state, you can use the response data directly
          setCompanyData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchData()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      console.error('Error Adding Company', error)
      toast.error('Error Adding Company. Please try again.', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  const editCompany = async (updatedData, companyId) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-company/${companyId}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Company Updated Successful!', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      setTimeout(async () => {
        // Handle the updated Admin in your state or UI
        const updateCompany = response.data

        setCompanyData(prevCom => {
          return prevCom.map(company => (company.id === updateCompany.id ? updateCompany : company))
        })

        // Wait for the fetchData to complete before proceeding
        await fetchData()
        setEditCompanyId(null)
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
      console.error('Error Updating Company', error)
      toast.error('Error Updating Company. Please try again.', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  const deleteCompany = async id => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-company/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      if (response.data.message === 'Company marked as deleted') {
        toast.success('Company Disabled Successful!', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '15px'
          }
        })
      } else if (response.data.message === 'Company marked as undeleted') {
        toast.success('Company Enabled Successful!', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '15px'
          }
        })
      }

      setTimeout(async () => {
        // Wait for the fetchData to complete before proceeding
        await fetchData()
      }, 1000)
    } catch (error) {
      console.error('Error deleting Company', error)
      toast.error('Error Enabled/Disabled Company. Please try again.', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })
    }
  }

  // For company logo
  useEffect(() => {
    const fetchCompanyLogos = async () => {
      try {
        const updatedLogoUrls = {}

        // Combine active and inactive companies
        const allCompanies = [...companyData, ...companyDataIn]

        await Promise.all(
          allCompanies.map(async company => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-logo/${company.id}`, {
              responseType: 'arraybuffer'
            })

            const imageData = new Uint8Array(response.data)
            const blob = new Blob([imageData], { type: 'image/png' })
            const dataURL = URL.createObjectURL(blob)
            updatedLogoUrls[company.id] = dataURL
          })
        )

        setLogoUrls(updatedLogoUrls)
      } catch (error) {
        console.error('Error fetching company logos:', error)
      }
    }

    fetchCompanyLogos()
  }, [companyData, companyDataIn])

  return {
    loading,
    loadingIn,
    companyData,
    companyDataIn,
    editCompanyId,
    addCompany,
    editCompany,
    deleteCompany,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,
    logoUrls
  }
}

export default useCompanyData
