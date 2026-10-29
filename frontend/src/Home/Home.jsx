import React from 'react'
import Left from './Leftpart/Left'
import Right from './Rightpart/Right'

const Home = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content min-h-screen bg-[#d7e5df]">
                <Right />
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu w-80 min-h-full border-r border-slate-200 bg-white p-0 text-base-content shadow-xl">
                    <Left />
                </ul>
            </div>
        </div>
    )
}

export default Home
