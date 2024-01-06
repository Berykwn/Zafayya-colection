import FormattedDate from "@/Components/Elements/FormattedDate";
import usePriceFormated from "@/Hooks/usePriceFormated";
import { Head } from "@inertiajs/react";
import React, { useRef, forwardRef } from "react";
import ReactToPrint from "react-to-print";

const TransactionTable = forwardRef(
    ({ transaction, totalTransaction }, ref) => {
        return (
            <div className="px-4 py-4" ref={ref}>
                <div className="mt-10 max-w-3xl">
                    <h3 className="text-md font-semibold mb-5">
                        Laporan transaksi berhasil Zafayya Collection
                    </h3>{" "}
                </div>
                <div className="relative overflow-x-auto shadow rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
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
                            {transaction.length > 0 ? (
                                transaction.map((item, index) => (
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
                                        <td className="px-6 py-2 text-green-500">
                                            {item.status}
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
                <h3 className="text-md font-semibold my-5">
                    Total: {usePriceFormated(totalTransaction)}
                </h3>
            </div>
        );
    }
);

const PrintAllTransactionReport = ({ transaction, totalTransaction }) => {
    const componentRef = useRef();

    return (
        <div>
            <Head title="Print Trasaction Report" />
            <div className="flex justify-center pt-10">
                <ReactToPrint
                    trigger={() => (
                        <button className="px-2 py-1 rounded-lg text-white text-sm bg-sky-500 hover:bg-sky-600">
                            Print report
                        </button>
                    )}
                    content={() => componentRef.current}
                />
            </div>

            <TransactionTable
                ref={componentRef}
                transaction={transaction}
                totalTransaction={totalTransaction}
            />
        </div>
    );
};

export default PrintAllTransactionReport;
