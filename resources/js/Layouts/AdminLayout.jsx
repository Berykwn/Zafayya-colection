import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

import Sidebar from "@/Components/Fragments/Sidebar";
import IconMenu from "@/Components/Elements/Icons/MenuIcon";
import NotificationIcon from "@/Components/Elements/Icons/NotificationIcon";
import SettingIcon from "@/Components/Elements/Icons/SettingIcon";

export default function AdminLayout({ auth, children, page, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebarOnOutsideClick = (e) => {
        const isSidebarButton = e.target.closest(
            '[data-drawer-target="default-sidebar"]'
        );
        const isClickInsideSidebar = e.target.closest("#default-sidebar");

        if (!isSidebarButton && !isClickInsideSidebar && sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeSidebarOnOutsideClick);

        return () => {
            document.removeEventListener("click", closeSidebarOnOutsideClick);
        };
    }, [sidebarOpen]);

    return (
        <div>
            <Sidebar sidebarOpen={sidebarOpen} page={page} />
            <Head title={title} />
            <div className="px-10 sm:ml-64 bg-gray-100">
                <nav className="bg-transparent border-gray-200">
                    <div className="max-w-screen-xl flex justify-between lg:p-2 md:p-2">
                        <div className="-ml-6">
                            <button
                                onClick={toggleSidebar}
                                data-drawer-target="default-sidebar"
                                data-drawer-toggle="default-sidebar"
                                aria-controls="default-sidebar"
                                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                type="button"
                            >
                                <IconMenu className="w-6" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 px-3 lg:py-2 mt-2 lg:ml-7 md:ml-7">
                            <NotificationIcon />

                            <SettingIcon />

                            <span className="text-sm">{auth.user.name}</span>
                        </div>
                    </div>
                </nav>

                <main className="container">{children}</main>

                <div className="flex justify-center py-4 px-8 mt-8">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © 2023{" "}
                        <a href="/" className="hover:underline">
                            Zafayya Collection
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </div>
    );
}
