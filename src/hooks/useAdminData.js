/* eslint-disable react-hooks/exhaustive-deps */
import { useTheme } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useAdminData = () => {
    const [adminData, setAdminData] = useState([]);
    const [editAdminId, setEditAdminId] = useState(null);
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('body');
    const authToken = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('login-details')) : null;
    const theme = useTheme();

    const handleClose = () => {
        setOpen(false);
        setEditAdminId(null);
    };

    // for dialog box
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleEdit = (id) => {
        setEditAdminId(id);
        setOpen(true);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("https://hrm.backhrm.online/api/adminList", {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                },
            });

            setAdminData(response.data);
        } catch (error) {
            console.error("Error fetching Admin", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [authToken?.token]);

    // Function to add form data to localStorage
    const addAdmin = async (newAdmin) => {
        try {
            const response = await axios.post("https://hrm.backhrm.online/api/add-admin", {
                ...newAdmin
            }, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`
                }
            })

            // Check the success status from the API response
            if (response.data) {
                toast.success('Admin Added Successful!', {
                    duration: 2000,
                    position: 'top-center',
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: "15px",
                    },
                });

                setTimeout(async () => {
                    // Instead of relying on the previous state, you can use the response data directly
                    setAdminData((prevData) => [...prevData, response.data]);
                    setOpen(false);

                    await fetchData();
                }, 1000); // 1000 milliseconds = 1 seconds
            }
        } catch (error) {
            console.error("Error Adding Admin", error);
            toast.error('Error Adding Admin. Please try again.', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });
        }
    };

    const editAdmin = async (updatedData, adminId) => {
        try {
            const response = await axios.put(`https://hrm.backhrm.online/api/update-admin/${adminId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`
                }
            });

            toast.success('Admin Updated Successful!', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });

            setTimeout(async () => {
                // Handle the updated Admin in your state or UI
                const updateAdmin = response.data;

                setAdminData((prevAdmin) => {
                    return prevAdmin.map((admin) =>
                        admin.id === updateAdmin.id ? updateAdmin : admin
                    );
                });

                // Wait for the fetchData to complete before proceeding
                await fetchData();
                setEditAdminId(null);
            }, 1000); // 1000 milliseconds = 1 seconds
        } catch (error) {
            console.error("Error Updating Admin", error);
            toast.error('Error Updating Admin. Please try again.', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });
        }
    };

    const deleteAdmin = async (id) => {
        try {
            const response = await axios.delete(`https://hrm.backhrm.online/api/delete-admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken?.token}`,
                },
            });

            if (response.data.message === "Admin marked as deleted") {
                toast.success('Admin Disabled Successful!', {
                    duration: 2000,
                    position: 'top-center',
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: "15px",
                    },
                });
            } else if (response.data.message === "Admin marked as undeleted") {
                toast.success('Admin Enabled Successful!', {
                    duration: 2000,
                    position: 'top-center',
                    style: {
                        background: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        fontSize: "15px",
                    },
                });
            }

            setTimeout(async () => {
                // Wait for the fetchData to complete before proceeding
                await fetchData();
            }, 1000); // 1000 milliseconds = 1 seconds

            // // Check the success status from the API response
            // if (response.data) {
            //     // Jo deleted admin pn table ma display karvana hoy to niche ne line remove karvani che
            //     setAdminData((prevData) => prevData.filter((admin) => admin.id !== id));
            // }
        } catch (error) {
            console.error("Error deleting Admin", error);
            toast.error('Error Enabled Admin. Please try again.', {
                duration: 2000,
                position: 'top-center',
                style: {
                    background: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    fontSize: "15px",
                },
            });
        }
    };

    return {
        adminData,
        editAdminId,
        addAdmin,
        editAdmin,
        deleteAdmin,
        open,
        setOpen,
        scroll,
        handleClickOpen,
        handleClose,
        handleEdit
    };
}

export default useAdminData;