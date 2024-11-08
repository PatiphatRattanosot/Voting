import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
    return (
        <div>
            
                <Navbar />
                <div className="p-4">
                    <Outlet />
                </div>
            
        </div>
    );
}

export default Layout;
