import React from 'react'
import User from './User'
import useGetAllUsers from '../../context/useGetAllUsers'

const Users = () => {

    const [allUsers, loading] = useGetAllUsers();
    // console.log(allUsers);

    return (
        <div className="">
            <h1 className="border-b border-slate-100 bg-white px-6 py-3 font-semibold text-slate-700">Chats</h1>
            <div className="py-2 flex-1 overflow-y-auto" style={{ maxHeight: "calc(83vh - 10vh)" }}>
                {allUsers.map((user, index) => (
                    <User key={index} user={user} />
                ))}
            </div>
        </div>
    )
}

export default Users
