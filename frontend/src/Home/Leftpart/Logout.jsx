import React from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Logout = () => {

    const [, setAuthUser] = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("/api/user/logout");
            localStorage.removeItem("ChatApp");
            Cookies.remove("jwt");
            setAuthUser(undefined);
            toast.success("Logout successfull!!");
            navigate("/login", { replace: true });
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.error || "Logout failed");
        }

    }

    return (
        <div className="border-t border-slate-200 bg-white p-3">
            <div>
                <BiLogOutCircle onClick={handleLogout} className="m-2 cursor-pointer rounded-full p-2 text-4xl text-slate-500 duration-300 hover:bg-slate-100 hover:text-[#6c63ff]" />
            </div>
        </div>
    )
}

export default Logout
