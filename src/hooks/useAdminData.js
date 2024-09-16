/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useAdminData = () => {
  const [editAdminId, setEditAdminId] = useState(null)
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('body')

  // Active admin states
  const [adminData, setAdminData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0) // Pagination starts from 0
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // Inactive admin states
  const [adminDataIn, setAdminDataIn] = useState([])
  const [loadingIn, setLoadingIn] = useState(true)
  const [totalItemsIn, setTotalItemsIn] = useState(0)
  const [totalPagesIn, setTotalPagesIn] = useState(0)
  const [pageIn, setPageIn] = useState(0)
  const [rowsPerPageIn, setRowsPerPageIn] = useState(5)
  const [searchIn, setSearchIn] = useState('')
  const [sortByIn, setSortByIn] = useState('name')
  const [sortOrderIn, setSortOrderIn] = useState('asc')

  const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
    setEditAdminId(null)
  }

  // for dialog box
  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleEdit = id => {
    setEditAdminId(id)
    setOpen(true)
  }

  // Function to handle fetch of active admin
  const fetchActiveData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/admin-active-list`, {
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

      setAdminData(data)
      setTotalItems(totalItems)
      setTotalPages(totalPages)
    } catch (error) {
      console.error('Error fetching active admin:', error)
    } finally {
      setLoading(false)
    }
  }

  // Function to handle fetch of inactive companies
  const fetchInactiveData = async () => {
    setLoadingIn(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/admin-inactive-list`, {
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

      setAdminDataIn(data)
      setTotalItemsIn(totalItems)
      setTotalPagesIn(totalPages)
    } catch (error) {
      console.error('Error fetching inactive admin:', error)
    } finally {
      setLoadingIn(false)
    }
  }

  useEffect(() => {
    if (authToken?.token) {
      fetchActiveData()
      fetchInactiveData()
    }
  }, [authToken?.token, page, rowsPerPage, sortBy, sortOrder, pageIn, rowsPerPageIn, sortByIn, sortOrderIn])

  // Function to add form data to localStorage
  const addAdmin = async newAdmin => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-admin`,
        {
          ...newAdmin
        },
        {
          headers: {
            Authorization: `Bearer ${authToken?.token}`
          }
        }
      )

      // Check the success status from the API response
      if (response.data) {
        toast.success('Admin Added Successful!', {
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
          setAdminData(prevData => [...prevData, response.data])
          setOpen(false)

          await fetchActiveData()
        }, 1000) // 1000 milliseconds = 1 seconds
      }
    } catch (error) {
      toast.error('Error Adding Admin. Please try again.', {
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

  const editAdmin = async (updatedData, adminId) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/update-admin/${adminId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      toast.success('Admin Updated Successful!', {
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
        const updateAdmin = response.data

        setAdminData(prevAdmin => {
          return prevAdmin.map(admin => (admin.id === updateAdmin.id ? updateAdmin : admin))
        })

        // Wait for the fetchData to complete before proceeding
        await fetchActiveData()
        await fetchInactiveData()
        setEditAdminId(null)
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
      toast.error('Error Updating Admin. Please try again.', {
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

  const deleteAdmin = async id => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/delete-admin/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken?.token}`
        }
      })

      if (response.data.message === 'Admin marked as deleted') {
        toast.success('Admin Disabled Successful!', {
          duration: 2000,
          position: 'top-center',
          style: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
            fontSize: '15px'
          }
        })
      } else if (response.data.message === 'Admin marked as undeleted') {
        toast.success('Admin Enabled Successful!', {
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
      }, 1000) // 1000 milliseconds = 1 seconds
    } catch (error) {
      toast.error('Error Enabled Admin. Please try again.', {
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
    editAdminId,
    addAdmin,
    editAdmin,
    deleteAdmin,
    open,
    setOpen,
    scroll,
    handleClickOpen,
    handleClose,
    handleEdit,

    // Active companies
    loading,
    adminData,
    totalItems,
    // totalPages,
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
    adminDataIn,
    totalItemsIn,
    // totalPagesIn,
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

export default useAdminData
