/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useCompanyData = () => {
  const [editCompanyId, setEditCompanyId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')
  const [logoUrls, setLogoUrls] = useState({})
  const [isViewMode, setIsViewMode] = useState(false)

  // Active companies states
  const [companyData, setCompanyData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0) // Pagination starts from 0
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('companyName')
  const [sortOrder, setSortOrder] = useState('asc')

  // Inactive companies states
  const [companyDataIn, setCompanyDataIn] = useState([])
  const [loadingIn, setLoadingIn] = useState(true)
  const [totalItemsIn, setTotalItemsIn] = useState(0)
  const [totalPagesIn, setTotalPagesIn] = useState(0)
  const [pageIn, setPageIn] = useState(0)
  const [rowsPerPageIn, setRowsPerPageIn] = useState(5)
  const [searchIn, setSearchIn] = useState('')
  const [sortByIn, setSortByIn] = useState('companyName')
  const [sortOrderIn, setSortOrderIn] = useState('asc')

  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
    setEditCompanyId(null)
    setIsViewMode(false)
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

  const handleViewSubscription = companyId => {
    setEditCompanyId(companyId)
    setIsViewMode(true)
    setOpen(true)
  }

  // Function to handle fetch of active companies
  const fetchActiveData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-active-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        },
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search,
          sortBy,
          sortOrder
        }
      })

      const { data, totalItems, totalPages } = response.data

      setCompanyData(data)
      setTotalItems(totalItems)
      setTotalPages(totalPages)
    } catch (error) {
      console.error('Error fetching active companies:', error)
    } finally {
      setLoading(false)
    }
  }

  // Function to handle fetch of inactive companies
  const fetchInactiveData = async () => {
    setLoadingIn(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/company-inactive-list`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        },
        params: {
          page: pageIn + 1,
          limit: rowsPerPageIn,
          search: searchIn,
          sortBy: sortByIn,
          sortOrder: sortOrderIn
        }
      })

      const { data, totalItems, totalPages } = response.data

      setCompanyDataIn(data)
      setTotalItemsIn(totalItems)
      setTotalPagesIn(totalPages)
    } catch (error) {
      console.error('Error fetching inactive companies:', error)
    } finally {
      setLoadingIn(false)
    }
  }

  // Fetch data when state changes
  useEffect(() => {
    if (authToken?.token) {
      fetchActiveData()
      fetchInactiveData()
    }
  }, [authToken?.token, page, rowsPerPage, sortBy, sortOrder, pageIn, rowsPerPageIn, sortByIn, sortOrderIn])

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

          await fetchActiveData()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
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
        await fetchActiveData()
        await fetchInactiveData()
        setEditCompanyId(null)
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
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
        await fetchActiveData()
        await fetchInactiveData()
      }, 1000)
    } catch (error) {
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

  const updateSubscription = async subscriptionData => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/renew-subscription/${subscriptionData.id}`,
        subscriptionData,
        {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Handle success (e.g., updating state or notifying the user)
      toast.success('Subscription updated successfully!', {
        duration: 2000,
        position: 'top-center',
        style: {
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
          fontSize: '15px'
        }
      })

      setTimeout(async () => {
        // Wait for the fetchData to complete before proceeding
        await fetchActiveData()
        await fetchInactiveData()
      }, 1000)
    } catch (error) {
      toast.error('Error updating subscription.', {
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

  return {
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
    logoUrls,
    handleViewSubscription,
    isViewMode,
    updateSubscription,

    // Active companies
    loading,
    companyData,
    totalItems,
    totalPages,
    page,
    rowsPerPage,
    search,
    setPage,
    setRowsPerPage,
    setSearch,
    setSortBy,
    setSortOrder,
    fetchActiveData,

    // Inactive companies
    loadingIn,
    companyDataIn,
    totalItemsIn,
    totalPagesIn,
    pageIn,
    rowsPerPageIn,
    searchIn,
    setPageIn,
    setRowsPerPageIn,
    setSearchIn,
    setSortByIn,
    setSortOrderIn,
    fetchInactiveData
  }
}

export default useCompanyData
