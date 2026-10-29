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
        <div className="h-[10vh]">
            <hr />
            <div>
                <BiLogOutCircle onClick={handleLogout} className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 m-3" />
            </div>
        </div>
    )
}

export default Logout
