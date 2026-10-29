import React from 'react'
import { FaKey } from 'react-icons/fa'
import { IoMdMail } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from '../context/AuthProvider'
import toast from "react-hot-toast";

const Login = () => {


    const [authUser, setAuthUser] = useAuth();

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
            const response = await axios.post("/api/user/login", userInfo);
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
            <div className="auth-page flex min-h-screen items-center justify-center px-4 py-8 text-slate-800">
                <form onSubmit={handleSubmit(onSubmit)} className="auth-card w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl shadow-indigo-200/60 sm:p-10">
                    <div className="mb-9 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#151515] p-2 shadow-lg">
                            <img src="/assets/logo.avif" className="h-full w-full rounded-xl object-cover" alt="A-Chat logo" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">A-Chat</h1>
                            <p className="text-xs font-medium text-slate-400">Connect. Share. Belong.</p>
                        </div>
                    </div>
                    <div className="mb-7">
                        <p className="mb-2 text-sm font-semibold text-[#6c63ff]">Welcome back</p>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Sign in to chat</h2>
                        <p className="mt-2 text-sm text-slate-400">Continue your conversations with friends.</p>
                    </div>
                    <div className="space-y-4">
                        <label className="auth-field flex items-center gap-3">
                            <IoMdMail className="text-lg text-[#6c63ff]" />
                            <input {...register("email", { required: true })} type="email" className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" placeholder="Email address" />
                        </label>
                        {errors.email && <span className="text-xs font-semibold text-rose-500">Email is required</span>}
                        <label className="auth-field flex items-center gap-3">
                            <FaKey className="text-sm text-[#6c63ff]" />
                            <input {...register("password", { required: true })} type="password" className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" placeholder="Password" />
                        </label>
                        {errors.password && <span className="text-xs font-semibold text-rose-500">Password is required</span>}
                    </div>
                    <div className="mt-7 space-y-5">
                        <input type="submit" value="Sign in" className="w-full cursor-pointer rounded-xl bg-[#6c63ff] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-[#574ee8]" />
                        <p className="text-center text-sm text-slate-400">New to A-Chat? <Link to="/signup" className="font-semibold text-[#6c63ff] hover:underline">Create an account</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
