import ConfirmCheckoutModal from "@/Components/Fragments/Modal/ConfirmCheckoutModal";
import ConfirmDeleteModal from "@/Components/Fragments/Modal/ConfirmDeleteModal";
import usePriceFormated from "@/Hooks/usePriceFormated";
import MainLayout from "@/Layouts/MainLayout";

import { router } from "@inertiajs/react";
import React, { useState } from "react";

const Order = ({ orders, flash, auth }) => {
    const [openModal, setOpenModal] = useState(undefined);
    const [openCheckoutModal, setOpenCheckoutModal] = useState(undefined);

    const calculateTotalPrice = (orders) => {
        let totalPrice = 0;

        orders.forEach((order) => {
            const productPrice = order.product.price;
            const quantity = order.qty;
            const subtotal = productPrice * quantity;
            totalPrice += subtotal;
        });

        return totalPrice;
    };

    const total = calculateTotalPrice(orders);

    const description = JSON.stringify(
        orders.map((order) => {
            return {
                product_name: order.product.name,
                price: order.qty * order.product.price,
                qty: order.qty,
            };
        })
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("description", description);
        formData.append("total_price", total);

        router.post("/checkout", formData);
    };

    return (
        <MainLayout title="order" auth={auth} page={"order"}>
            <div className="lg:px-32 lg:py-8 px-2 py-4">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    <div className="md:col-span-5">
                        {flash.message && (
                            <div
                                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100"
                                role="alert"
                            >
                                {flash.message}
                            </div>
                        )}
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700  bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Product name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            qty
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price/pcs
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total item price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length > 0 ? (
                                        orders.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="odd:bg-white even:bg-gray-50 border-b"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {item.product.name}
                                                </th>

                                                <td className="px-6 py-4">
                                                    {item.qty}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {usePriceFormated(
                                                        item.product.price
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {usePriceFormated(
                                                        item.product.price *
                                                            item.qty
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() =>
                                                            setOpenModal(
                                                                `pup-up${item.id}`
                                                            )
                                                        }
                                                        className="px-2 py-2 text-xs font-medium text-center rounded-lg text-white bg-red-500 hover:bg-red-400"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            className="w-4"
                                                        >
                                                            <title>
                                                                delete
                                                            </title>
                                                            <path
                                                                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                    </button>

                                                    <ConfirmDeleteModal
                                                        id={item.id}
                                                        url={`/cart/delete/${item.id}`}
                                                        name={item.product.name}
                                                        openModal={openModal}
                                                        setOpenModal={
                                                            setOpenModal
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 font-semibold"
                                            >
                                                Not found data
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:col-span-2 mt-4 md:mt-0">
                        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                Checkout
                            </h5>
                            <div className="px-3 py-2 text-sm text-gray-800 rounded-lg bg-gray-100">
                                Klik checkout untuk mendapatkan barang favorit
                                Anda.
                            </div>
                            <div className="text-lg font-semibold my-2">
                                {usePriceFormated(total)}
                            </div>

                            <button
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                onClick={() => setOpenCheckoutModal(true)}
                                disabled={orders.length < 1}
                            >
                                Checkout
                            </button>

                            <ConfirmCheckoutModal
                                openCheckoutModal={openCheckoutModal}
                                setOpenCheckoutModal={setOpenCheckoutModal}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Order;
