import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotAllowed() {
    const [counter, setcounter] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setInterval(() => {
            navigate("/");
        }, 5000);
        const countDown = setInterval(() => {
            setcounter((prevCounter) => {
                if (prevCounter <= 1) {
                    clearInterval(countDown);
                }
                return prevCounter - 1;
            });
        }, 1000);
        return () => {
            clearInterval(countDown);
            clearTimeout(timer);
        };
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center  bg-blue-50 text-blue-900">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-blue-800">
                    Not <span className="text-red-800">Allowed!!!</span>
                </h1>
                <p className="pt-8 text-blue-600">
                    To access this page, you must log in with a higher level account.
                </p>
                <p className="pt-3 pb-6 text-blue-500">
                    You will be redirected to the homepage in{" "}
                    <span className="text-emerald-700">{counter}</span> seconds.
                </p>
                <button onClick={() => navigate("/")} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                    Return to home page
                </button>
            </div>
        </div>

    );
}

export default NotAllowed;