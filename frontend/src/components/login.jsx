import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import api from '../axios.js'
import { useAuth } from '../context/AuthProvider'
import toast from "react-hot-toast";

const Login = () => {
    const [, setAuthUser] = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.password,
        };

        try {
            const response = await api.post("/api/user/login", userInfo);
            if (response.data) {
                reset();
                toast.success("Login Successful");
                localStorage.setItem("ChatApp", JSON.stringify(response.data));
                setAuthUser(response.data);
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error);
            }
        }
    };


    return (
        <>
            <div className="h-screen flex justify-center items-center bg-slate-900 text-white">
                <form onSubmit={handleSubmit(onSubmit)} className="border border-white rounded-3xl px-6 py-6 w-80 md:w-96 flex flex-col justify-between space-y-6 shadow-lg shadow-green-500">
                    <div className="flex justify-between items-center">
                        <img src="/assets/logo.avif" className="w-12 rounded-full border border-x-4 border-y-4 border-red-500" alt="logo" />
                        <h1 className="text-3xl mx-auto bg-black px-3 py-2 rounded-xl"><span className="font-semibold bg-gradient-to-r from-red-500 via-blue-500 to-red-500 text-transparent bg-clip-text">A-Chat</span></h1>
                    </div>
                    <h2 className="font-semibold px-2 py-2 text-2xl text-start font-mono bg-gradient-to-r from-blue-500 via-red-500 to-red-500 text-transparent bg-clip-text">Login</h2>
                    <div className="space-y-4">
                        <label className="flex items-center gap-2">
                            <IoMdMail className="absolute ml-3 text-lg" />
                            <input {...register("email", { required: true })} type="email" className="w-full border px-9 py-3 rounded-lg text-black" placeholder="Email" />
                        </label>
                        {errors.email && <span className="text-red-500 text-[12px] font-semibold">*Email is required</span>}
                        <label className="relative flex items-center gap-2">
                            <FaKey className="absolute ml-3 text-sm" />
                            <input {...register("password", { required: true })} type={showPassword ? "text" : "password"} className="w-full border py-3 pl-9 pr-11 rounded-lg text-black" placeholder="Password" />
                            <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 text-gray-600" aria-label={showPassword ? "Hide password" : "Show password"}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </label>
                        {errors.password && <span className="text-red-500 text-[12px] font-semibold">*Password is required</span>}
                    </div>
                    <div className="justify-between space-y-5">
                        <input type="submit" value="Login" className="bg-gradient-to-r from-blue-500 to-red-500 px-3 py-2 rounded-lg cursor-pointer  shadow-lg shadow-slate-600 hover:shadow-green-500" />
                        <p className="self-center">New to <span className="bg-black rounded-md px-2 py-1"><span className="font-mono font-bold  md:text-lg bg-gradient-to-r from-red-500 via-blue-500 to-red-500 text-transparent bg-clip-text">A-Chat?</span></span><Link to="/signup" className="text-blue-400">{"  "}Signup</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
