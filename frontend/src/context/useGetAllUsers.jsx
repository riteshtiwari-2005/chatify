import React, { useEffect, useState } from 'react'
import api from '../axios';

const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const response = await api.get("/api/user/allusers",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    }
                );
                setAllUsers(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getUsers();
    }, [])

    return [allUsers, loading]
}

export default useGetAllUsers
