import FormattedDate from "@/Components/Elements/FormattedDate";
import ConfirmPaymentModal from "@/Components/Fragments/Modal/ConfirmPaymentModal";
import Paginator from "@/Components/Fragments/Paginator";
import usePriceFormated from "@/Hooks/usePriceFormated";
import useSearch from "@/Hooks/useSearch";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";

const Order = ({ auth, flash, transaction, allTransaction }) => {
    const [openModal, setOpenModal] = useState(undefined);
    const { searchKeyword, handleSearchInputChange, filteredData } = useSearch(
        allTransaction,
        transaction.data,
        ["transaction_code", "description"],
        ""
    );
    return (
        <AdminLayout title="Order" page="order" auth={auth}>
            <section className="lg:px-4 px-0 lg:py-0 py-2">
                <h1 className="text-2xl font-semibold mb-4">Orders</h1>

                {flash.message && (
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100">
                        {flash.message}
                    </div>
                )}

                {/* Input search */}
                <input
                    type="text"
                    className="w-full lg:w-1/2 my-4 shadow-sm bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-slate-300 focus:border-slate-500 block"
                    placeholder="Type to search order by code"
                    value={searchKeyword}
                    onChange={handleSearchInputChange}
                />
                {/* Input search */}

                <div className="relative overflow-x-auto shadow rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-white border-b-2 border-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    Order item
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Total price
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    User name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b"
                                    >
                                        <th scope="row" className="px-6 py-2">
                                            <div className="relative overflow-x-auto">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                                    <tbody>
                                                        {JSON.parse(
                                                            item.description
                                                        ).map(
                                                            (
                                                                product,
                                                                productIndex
                                                            ) => (
                                                                <tr
                                                                    key={
                                                                        product.id ||
                                                                        `${index}-${productIndex}`
                                                                    }
                                                                    className="bg-white border-b"
                                                                >
                                                                    <td
                                                                        scope="row"
                                                                        className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap"
                                                                    >
                                                                        {productIndex +
                                                                            1}
                                                                        .
                                                                    </td>
                                                                    <td className="px-3 py-3">
                                                                        {" "}
                                                                        {
                                                                            product.product_name
                                                                        }
                                                                    </td>
                                                                    <td className="px-3 py-3">
                                                                        {
                                                                            product.qty
                                                                        }
                                                                        pcs
                                                                    </td>
                                                                    <td className="px-3 py-3">
                                                                        {usePriceFormated(
                                                                            product.price
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </th>
                                        <td className="px-6 py-2">
                                            <FormattedDate
                                                date={item.updated_at}
                                            />
                                        </td>
                                        <td className="px-6 py-2">
                                            {usePriceFormated(item.total_price)}
                                        </td>
                                        <td className="px-6 py-2">
                                            {item.user.name}
                                        </td>
                                        <td className="px-6 py-2">
                                            <button
                                                onClick={() =>
                                                    setOpenModal(
                                                        `pup-up${item.id}`
                                                    )
                                                }
                                                className="text-amber-500 hover:underline"
                                            >
                                                Confirm
                                            </button>

                                            <ConfirmPaymentModal
                                                id={item.id}
                                                url={`/dashboard/orders/confirm/${item.id}`}
                                                userName={item.user.name}
                                                image={item.payment}
                                                openModal={openModal}
                                                setOpenModal={setOpenModal}
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

                <div className="flex justify-center mt-8 mb-2">
                    <Paginator link={transaction.links} />
                </div>
            </section>
        </AdminLayout>
    );
};

export default Order;
