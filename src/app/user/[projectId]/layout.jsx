'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function UserPagesLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="w-full h-full flex relative">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            
            {/* Sidebar - Hidden on mobile, shown as overlay when open */}
            <div className={`
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
                fixed lg:static
                inset-y-0 left-0 z-50
                transition-transform duration-300 ease-in-out
            `}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1 h-full overflow-hidden w-full">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden fixed top-20 sm:top-24 left-4 z-40 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                    aria-label="Toggle sidebar"
                >
                    {sidebarOpen ? (
                        <FaTimes className="text-gray-600 dark:text-gray-300" />
                    ) : (
                        <FaBars className="text-gray-600 dark:text-gray-300" />
                    )}
                </button>
                {children}
            </div>
        </div>
    );
}