import { Link } from "@inertiajs/react";

import ApplicationLogo from "../Elements/ApplicationLogo";
import DashboardIcon from "../Elements/Icons/DashboardIcon";
import WarehouseIcon from "../Elements/Icons/WarehouseIcon";
import CartIcon from "../Elements/Icons/CartIcon";
import TransactionIcon from "../Elements/Icons/TransactionIcon";
import AccountIcon from "../Elements/Icons/AccountIcon";

const Sidebar = ({ sidebarOpen, page }) => {
    return (
        <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
                <ul className="md:w-full flex-grow mb-4">
                    <li className="flex gap-2 py-4 justify-center">
                        <ApplicationLogo className="w-16" />
                        <span className="mt-7 font-[cursive] text-sm">
                            Zaffaya. <br /> Collection
                        </span>
                    </li>
                </ul>

                <Link
                    href={route("dashboard")}
                    className={`flex items-center mt-1 px-3 py-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                        page == "dashboard" && "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                    <DashboardIcon />

                    <span className="ml-3 text-md">Dashboard</span>
                </Link>

                <Link
                    href={route("dashboard.product")}
                    className={`flex items-center mt-1 px-3 py-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                        page == "product" && "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                    <WarehouseIcon />
                    <span className="ml-3 text-md text-slate-500 font-semibold">
                        Product
                    </span>
                </Link>

                <Link
                    href={route("dashboard.order")}
                    className={`flex items-center mt-1 px-3 py-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                        page == "order" && "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                    <CartIcon />
                    <span className="ml-3 text-md text-slate-500 font-semibold">
                        Orders
                    </span>
                </Link>

                <Link
                    href={route("dashboard.transaction")}
                    className={`flex items-center mt-1 px-3 py-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                        page == "transaction" && "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                    <TransactionIcon />
                    <span className="ml-3 text-md text-slate-500 font-semibold">
                        Transaction report
                    </span>
                </Link>

                <Link
                    className={`flex items-center mt-1 px-3 py-2 text-gray-900 rounded-lg hover:bg-gray-100 ${
                        page == "profile" && "bg-gray-100 hover:bg-gray-200"
                    }`}
                    href={route("profile.edit")}
                >
                    <AccountIcon />
                    <span className="ml-3 text-md text-slate-500 font-semibold">
                        Profile setting
                    </span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
