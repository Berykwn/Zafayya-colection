import React from "react";
import Navbar from "@/Components/Fragments/Navbar";
import { Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/Elements/ApplicationLogo";

const MainLayout = ({ children, title, auth, page }) => {
    return (
        <div>
            <Head title={title} />

            <Navbar auth={auth} page={page} />

            <main>{children}</main>

            <footer className="bg-white rounded-lg shadow mt-12">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <hr className="my-6 border-gray-200 sm:mx-autolg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a
                            href="#"
                            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                        >
                            <ApplicationLogo className="w-14" />
                            <span className="font-[cursive] text-sm">
                                Zaffaya. <br /> Collection
                            </span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline me-4 md:me-6"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline me-4 md:me-6"
                                >
                                    Product
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:underline me-4 md:me-6"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-autolg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center">
                        © 2023{" "}
                        <a
                            href="https://flowbite.com/"
                            className="hover:underline"
                        >
                            Zafayya Colection™
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
