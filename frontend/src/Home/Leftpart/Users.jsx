import React from 'react'
import User from './User'
import useGetAllUsers from '../../context/useGetAllUsers'

const Users = () => {

    const [allUsers, loading] = useGetAllUsers();
    // console.log(allUsers);

    return (
        <div className="">
            <h1 className="border-b border-slate-100 bg-white px-7 py-5 text-lg font-bold text-[#334155]">Chats</h1>
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(83vh - 10vh)" }}>
                {allUsers.map((user, index) => (
                    <User key={index} user={user} />
                ))}
            </div>
        </div>
    )
}

export default Users
