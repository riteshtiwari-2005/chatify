import React from 'react'
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from '../context/AuthProvider';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();


    const [authUser, setAuthUser] = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    //watch the password and confirm password fields
    const password = watch("password", "");
    const confirmPassword = watch("confirmPassword", "");

    const validatePasswordMatch = (value) => {
        return value === password || "*Passwords do not match";
    }

    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };

        try {
            const response = await axios.post("/api/user/signup", userInfo);
            if (response.data) {
                reset();
                toast.success("Signup Successful");
                navigate("/login");
                
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data?.error || `Signup failed (${error.response.status})`);
            } else {
                toast.error("Unable to reach the server");
            }
        }
    };

    return (
        <>
            <div className="auth-page flex min-h-screen items-center justify-center px-4 py-8 text-slate-800">
                <form onSubmit={handleSubmit(onSubmit)} className="auth-card w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl shadow-indigo-200/60 sm:p-10">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#151515] p-2 shadow-lg">
                            <img src="/assets/logo.avif" className="h-full w-full rounded-xl object-cover" alt="A-Chat logo" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900">A-Chat</h1>
                            <p className="text-xs font-medium text-slate-400">Connect. Share. Belong.</p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <p className="mb-2 text-sm font-semibold text-[#6c63ff]">Join the community</p>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h2>
                        <p className="mt-2 text-sm text-slate-400">Start meaningful conversations today.</p>
                    </div>
                    <div className="space-y-3">
                        <label className="auth-field flex items-center gap-3">
                            <FaUser className="text-sm text-[#6c63ff]" />
                            <input {...register("fullname", { required: true })} type="text" className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" placeholder="Full name" />
                        </label>
                        {errors.fullname && <span className="text-xs font-semibold text-rose-500">Name is required</span>}
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
                        <label className="auth-field flex items-center gap-3">
                            <FaKey className="text-sm text-[#6c63ff]" />
                            <input {...register("confirmPassword", { required: true, validate: validatePasswordMatch })} type="password" className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" placeholder="Confirm password" />
                        </label>
                        {errors.confirmPassword && <span className="text-xs font-semibold text-rose-500">{errors.confirmPassword.message}</span>}
                    </div>
                    <div className="mt-7 space-y-5">
                        <input type="submit" value="Create account" className="w-full cursor-pointer rounded-xl bg-[#6c63ff] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-[#574ee8]" />
                        <p className="text-center text-sm text-slate-400">Already have an account? <Link to="/login" className="font-semibold text-[#6c63ff] hover:underline">Sign in</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
