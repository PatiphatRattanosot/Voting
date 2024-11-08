import React, { useState } from 'react';
import { useWeb3 } from '../useContexts/Web3Context'; 

function Navbar() {
    const { chainId, accounts, isActive, handleConnect, handleDisconnect, error } = useWeb3();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold">MyApp</h1>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                                <a href="/admin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Admin Page</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        {isActive ? (
                            <button
                                onClick={handleDisconnect}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Disconnect
                            </button>
                        ) : (
                            <button
                                onClick={handleConnect}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Connect MetaMask
                            </button>
                        )}
                        {isActive && (
                            <div className="text-center p-2">
                                <button
                                    onClick={openModal}
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white text-white px-4 py-2 rounded-md"
                                >
                                    View MetaMask Info
                                </button>
                            </div>
                        )}
                        {isModalOpen && (
                            <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                <div className="bg-gray-900 p-6 rounded-lg w-auto">
                                    <h2 className="text-xl font-semibold text-white">MetaMask Information</h2>
                                    <div className="mt-4 text-white">
                                        <p><strong>Connected Account:</strong> {accounts ? accounts[0] : 'N/A'}</p>
                                        <p><strong>Chain ID:</strong> {chainId}</p>
                                    </div>
                                    {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={closeModal}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </nav>
    );
}

export default Navbar;
