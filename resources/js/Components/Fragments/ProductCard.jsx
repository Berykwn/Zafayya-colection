import usePriceFormated from "@/Hooks/usePriceFormated";
import { Link } from "@inertiajs/react";
import React from "react";

const ProductCard = ({ id, name, price, categories, stock, image }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <img
                className="rounded-t-lg"
                src={`/storage/img/products/${image}`}
                alt="product image"
            />
            <div className="px-5 pb-5 mt-4">
                <h5 className="text-md font-semibold tracking-tight text-gray-900">
                    {name}
                </h5>
                <div className="flex text-slate-500 mt-1 gap-1">
                    <span className="text-sm font-bold">{categories} |</span>{" "}
                    <span className="text-sm">stock : {stock}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between mt-4">
                    <span className="text-md font-bold text-slate-950">
                        {usePriceFormated(price)}
                    </span>
                    <Link
                        method="GET"
                        data={{ id: id }}
                        href={route("product.show")}
                        className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
                    >
                        Detail
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
