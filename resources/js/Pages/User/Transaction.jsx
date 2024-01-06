import FormattedDate from "@/Components/Elements/FormattedDate";
import usePriceFormated from "@/Hooks/usePriceFormated";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const Transaction = ({ auth, transaction, flash }) => {
    return (
        <MainLayout title="Transaction" page="transaction" auth={auth}>
            <div className="lg:px-32 py-8">
                {flash.message && (
                    <div
                        className="p-4 mb-4 lg:w-1/2 text-sm text-green-800 rounded-lg bg-green-100"
                        role="alert"
                    >
                        {flash.message}
                    </div>
                )}

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order item
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transaction.length > 0 ? (
                                transaction.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white even:bg-gray-50 border-b"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {JSON.parse(item.description).map(
                                                (product, index, array) => (
                                                    <span key={index}>
                                                        {`${
                                                            index + 1
                                                        }. ${
                                                            product.product_name
                                                        }, ${
                                                            product.qty
                                                        }pcs, ${
                                                            usePriceFormated(product.price)
                                                        }`}
                                                        {index !==
                                                            array.length -
                                                                1 && <br />}
                                                    </span>
                                                )
                                            )}
                                        </th>

                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {item.transaction_code}
                                        </td>
                                        <td className="px-6 py-4">
                                            <FormattedDate
                                                date={item.created_at}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            {usePriceFormated(item.total_price)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.status ===
                                                "Menunggu pembayaran" && (
                                                <Link
                                                    href={route(
                                                        "transaction.payment.upload"
                                                    )}
                                                    data={{ id: item.id }}
                                                    className="text-rose-500 hover:underline"
                                                >
                                                    {item.status}
                                                </Link>
                                            )}

                                            {item.status ===
                                                "Menunggu Konfirmasi" && (
                                                <Link className="text-yellow-500 hover:underline">
                                                    {item.status}
                                                </Link>
                                            )}

                                            {item.status ===
                                                "Success" && (
                                                <span className="text-green-500 hover:underline">
                                                    {item.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 font-semibold">
                                        Not found data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default Transaction;
