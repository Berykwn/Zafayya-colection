import { Link } from "@inertiajs/react";
import { useState } from "react";

import ConfirmDeleteModal from "@/Components/Fragments/Modal/ConfirmDeleteModal";
import Paginator from "@/Components/Fragments/Paginator";
import usePriceFormated from "@/Hooks/usePriceFormated";
import useSearch from "@/Hooks/useSearch";
import AdminLayout from "@/Layouts/AdminLayout";

const Product = ({ auth, product, allProduct, flash }) => {
    const [openModal, setOpenModal] = useState(undefined);

    const { searchKeyword, handleSearchInputChange, filteredData } = useSearch(
        allProduct,
        product.data,
        ["name", "description"],
        ""
    );

    return (
        <AdminLayout title="Product" page="product" auth={auth}>
            <section className="lg:px-4 px-0 lg:py-0 py-2">
                <h1 className="text-2xl font-semibold mb-4">Product</h1>

                {flash.message && (
                    <div className="p-4 mb-4 lg:w-1/2 text-sm text-green-800 rounded-lg bg-emerald-400">
                        <span className="text-md text-white">{flash.message}</span>
                    </div>
                )}

                <Link
                    href={route("dashboard.product.create")}
                    className="bg-sky-600 hover:bg-sky-500 text-white rounded-lg px-3 py-1"
                    as="button"
                >
                    Add new product
                </Link>

                {/* Input search */}
                <input
                    type="text"
                    className="w-full lg:w-1/2 my-4 shadow-sm bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-slate-300 focus:border-slate-500 block"
                    placeholder="Type to search product"
                    value={searchKeyword}
                    onChange={handleSearchInputChange}
                />
                {/* Input search */}

                <div className="relative overflow-x-auto shadow rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-white border-b-2 border-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Categories
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    stock
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Action
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
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.categories}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.stock}
                                        </td>
                                        <td className="px-6 py-4">
                                            {usePriceFormated(item.price)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() =>
                                                        setOpenModal(
                                                            `pup-up${item.id}`
                                                        )
                                                    }
                                                    className="px-2 py-1 text-xs font-medium text-center rounded-lg text-white bg-pink-500 hover:bg-pink-600"
                                                >
                                                    Delete
                                                </button>

                                                <ConfirmDeleteModal
                                                    id={item.id}
                                                    url={`/dashboard/product/destroy/${item.id}`}
                                                    name={item.name}
                                                    openModal={openModal}
                                                    setOpenModal={setOpenModal}
                                                />

                                                <Link
                                                    href={route(
                                                        "dashboard.product.edit"
                                                    )}
                                                    data={{ id: item.id }}
                                                    as="button"
                                                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-2 py-1 rounded-lg"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
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

                <div className="flex justify-end pt-8 pb-2">
                    <Paginator link={product.links} />
                </div>
            </section>
        </AdminLayout>
    );
};

export default Product;
