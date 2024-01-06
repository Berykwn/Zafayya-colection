import { Link } from "@inertiajs/react";
import { Dropdown } from "flowbite-react";
import React, { useState } from "react";

import ApplicationLogo from "../Elements/ApplicationLogo";

const Navbar = ({ auth, page }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <>
            <nav className="bg-white border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py- px-2 lg:px-0">
                    <a
                        href="#"
                        className="flex items-center space-x-2 rtl:space-x-reverse"
                    >
                        <ApplicationLogo className="w-14" />
                        <span className="font-[cursive] text-sm">
                            Zaffaya. <br /> Collection
                        </span>
                    </a>

                    <div className="w-ful md:w-auto">
                        <ul className="font-medium flex flex-col p-4 md:p-0  md:flex-row md:space-x-8 rtl:space-x-reverse">
                            {!auth.user ? (
                                <div
                                    className="inline-flex rounded-md shadow-sm"
                                    role="group"
                                >
                                    <Link
                                        href={route("login")}
                                        className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <Dropdown
                                    inline
                                    label={
                                        <span className="text-sm">
                                            {auth.user.name}
                                        </span>
                                    }
                                >
                                    <Dropdown.Item
                                        as={Link}
                                        method="post"
                                        href={route("logout")}
                                    >
                                        Log out
                                    </Dropdown.Item>
                                </Dropdown>
                            )}
                        </ul>
                    </div>
                    {/* <div
                        className={`${
                            isNavOpen ? "block" : "hidden"
                        } w-full md:block md:w-auto`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                            {!auth.user ? (
                                <div
                                    className="inline-flex rounded-md shadow-sm"
                                    role="group"
                                >
                                    <Link
                                        href={route("login")}
                                        className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <Dropdown
                                    inline
                                    label={
                                        <span className="text-sm">
                                            {auth.user.name}
                                        </span>
                                    }
                                >
                                    <Dropdown.Item
                                        as={Link}
                                        method="post"
                                        href={route("logout")}
                                    >
                                        Log out
                                    </Dropdown.Item>
                                </Dropdown>
                            )}
                        </ul>
                    </div> */}
                </div>
            </nav>

            <div className="lg:px-28">
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                        <li className="me-2">
                            <Link
                                href={route("home")}
                                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${
                                    page === "home"
                                        ? "text-emerald-600 border-b-2 border-emerald-600"
                                        : "border-b-2 border-transparent"
                                }`}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="me-2">
                            <Link
                                href={route("products")}
                                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${
                                    page === "product"
                                        ? "text-emerald-600 border-b-2 border-emerald-600"
                                        : "border-b-2 border-transparent"
                                }`}
                            >
                                Product
                            </Link>
                        </li>
                        <li className="me-2">
                            <Link
                                href={route("orders")}
                                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${
                                    page === "order"
                                        ? "text-emerald-600 border-b-2 border-emerald-600"
                                        : "border-b-2 border-transparent text-gray"
                                }`}
                            >
                                My Orders
                            </Link>
                        </li>
                        <li className="me-2">
                            <Link
                                href={route("transaction")}
                                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 ${
                                    page === "transaction"
                                        ? "text-emerald-600 border-b-2 border-emerald-600"
                                        : "border-b-2 border-transparent"
                                }`}
                            >
                                Transaction
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
