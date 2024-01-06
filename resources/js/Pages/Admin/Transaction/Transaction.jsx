import FormattedDate from "@/Components/Elements/FormattedDate";
import PrinterIcon from "@/Components/Elements/Icons/PrinterIcon";
import Paginator from "@/Components/Fragments/Paginator";

import usePriceFormated from "@/Hooks/usePriceFormated";
import useSearch from "@/Hooks/useSearch";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

const Transaction = ({ auth, flash, transaction, allTransaction }) => {
    const { searchKeyword, handleSearchInputChange, filteredData } = useSearch(
        allTransaction,
        transaction.data,
        ["transaction_code", "updated_at"],
        ""
    );

    return (
        <AdminLayout auth={auth} title="Transaction" page="transaction">
            <section className="lg:px-4 px-0 lg:py-0 py-2">
                <h1 className="text-2xl font-semibold mb-4">
                    Transaction report
                </h1>

                <Link
                    href={route("dashboard.transaction.printall")}
                    className="px-2 py-1 rounded-lg text-white text-sm bg-sky-500 hover:bg-sky-600"
                >
                    Print report
                </Link>

                {flash.message && (
                    <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100">
                        {flash.message}
                    </div>
                )}

                {/* Input search */}
                <input
                    type="text"
                    className="w-full lg:w-1/2 my-4 shadow-sm bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-slate-300 focus:border-slate-500 block"
                    placeholder="Type to search transaction"
                    value={searchKeyword}
                    onChange={handleSearchInputChange}
                />
                {/* Input search */}

                <div className="relative overflow-x-auto shadow rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-white border-b-2 border-gray-200">
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
                                        className="bg-white border-b-2 border-gray-200"
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
                                                                >
                                                                    <td
                                                                        scope="row"
                                                                        className="py-1 font-medium text-gray-900 whitespace-nowrap"
                                                                    >
                                                                        {productIndex +
                                                                            1}
                                                                        .
                                                                    </td>
                                                                    <td className="py-1">
                                                                        {" "}
                                                                        {
                                                                            product.product_name
                                                                        }
                                                                    </td>
                                                                    <td className="py-1">
                                                                        {
                                                                            product.qty
                                                                        }
                                                                        pcs
                                                                    </td>
                                                                    <td className="py-1">
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
                                            <Link
                                                as="button"
                                                href={route(
                                                    "dashboard.transaction.print.detail"
                                                )}
                                                data={{ id: item.id }}
                                                className="p-1 text-xs font-medium text-center rounded-lg text-white bg-sky-500 hover:bg-sky-400"
                                            >
                                                <PrinterIcon />
                                            </Link>
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
                    <Paginator link={transaction.links} />
                </div>
            </section>
        </AdminLayout>
    );
};

export default Transaction;
