import React, { useState } from 'react'
import { IoSend } from "react-icons/io5"
import { MdMyLocation } from "react-icons/md"
import toast from "react-hot-toast"
import useSendMessage from '../../context/useSendMessage'
const Typesend = () => {

    const [message, setMessage] = useState("");
    const { loading, sendMessages } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; 
        await sendMessages(message);
        setMessage("");
    }

    const handleShareLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Location is not supported by this browser");
            return;
        }

        const shareLocation = async ({ coords }) => {
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            const locationMessage = `My current location: ${latitude}, ${longitude}\nhttps://www.google.com/maps?q=${latitude},${longitude}`;

            const sent = await sendMessages(locationMessage, { latitude, longitude });
            if (sent) {
                toast.success("Location shared");
            } else {
                toast.error("Unable to share your location");
            }
        };

        const showLocationError = (error) => {
            const errorMessage = {
                1: "Location permission was denied",
                2: "Your location could not be determined",
                3: "Location request timed out",
            }[error.code] || "Unable to get your location";

            toast.error(errorMessage);
        };

        const useNetworkLocation = () => {
            navigator.geolocation.getCurrentPosition(
                shareLocation,
                showLocationError,
                {
                    enableHighAccuracy: false,
                    timeout: 30000,
                    maximumAge: 60000,
                }
            );
        };

        navigator.geolocation.getCurrentPosition(
            shareLocation,
            (error) => {
                if (error.code === 2 || error.code === 3) {
                    useNetworkLocation();
                    return;
                }
                showLocationError(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex h-[9vh] items-center gap-2 border-t border-[#d1d7db] bg-[#f0f2f5] px-3">
                <div className="flex-1">
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" className="w-full rounded-full border-0 bg-white px-5 py-3 text-sm text-slate-700 outline-none shadow-sm focus:ring-2 focus:ring-[#9de1d6]" />
                </div>
                <button
                    type="button"
                    onClick={handleShareLocation}
                    disabled={loading}
                    aria-label="Share current location"
                    title="Share current location"
                    className="rounded-full p-2 transition hover:bg-[#d9fdd3] disabled:opacity-50"
                >
                    <MdMyLocation className="text-2xl text-[#128c7e]" />
                </button>
                <button type="submit" disabled={loading || !message.trim()} className="rounded-full bg-[#128c7e] p-3 text-white transition hover:bg-[#075e54] disabled:opacity-40">
                    <IoSend className="text-xl" />
                </button>
            </div>
        </form>
    )
}

export default Typesend
