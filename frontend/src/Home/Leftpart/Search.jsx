import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
const Search = () => {

    const [search, setSearch] = useState("");
    const [allUsers] = useGetAllUsers();
    const { setSelectedConversation } = useConversation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        const conversation = allUsers.find((user) => (
            user.fullname?.toLowerCase().includes(search.toLowerCase())
        ))
        if(conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        } else {
            toast.error("User not found");
        }
    }

    return (
        <div className="border-b border-slate-100 bg-white">
            <div className="px-6 pb-5 pt-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center">
                        <label className="flex h-14 w-full items-center gap-3 rounded-xl bg-[#dedcff] px-4 transition focus-within:bg-[#d5d2ff]">
                            <FaSearch className="text-xl text-[#334155]" />
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="w-full bg-transparent text-base font-medium text-[#334155] outline-none placeholder:text-[#475569]" placeholder="Search" />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search
