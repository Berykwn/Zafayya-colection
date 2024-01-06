import MainLayout from "@/Layouts/MainLayout";
import usePriceFormated from "@/Hooks/usePriceFormated";
import { router } from "@inertiajs/react";
import { useState } from "react";

const ProductDetail = ({ product, auth }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        router.post("/cart/add", { product_id: product.id, qty: quantity });
    };

    return (
        <MainLayout title="Detail Product" auth={auth} page="product">
            <div className="lg:px-28 lg:py-8">
                <div className="flex flex-col gap-6 lg:flex-row bg-white p-4">
                    <div className="lg:w-2/5 ">
                        <img
                            src={`/storage/img/products/${product.image}`}
                            alt="Gambar Produk"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>

                    <div className="lg:w-3/5">
                        <h2 className="text-2xl font-bold mb-4">
                            {product.name}
                        </h2>
                        <div className="flex text-slate-500">
                            <span className="text-sm mr-1">
                                categories: {product.categories}
                            </span>{" "}
                            |
                            <span className="text-sm ml-1">
                                stock : {product.stock}
                            </span>
                        </div>

                        <div
                            className="p-4 my-3 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
                            role="alert"
                        >
                            <span className="font-medium">Warning!</span> we
                            only sell the best original products.
                        </div>

                        <p className="text-gray-800">{product.description}</p>

                        <p className="text-gray-600">{product.body}</p>

                        <div className="mt-2">
                            <span className="text-lg font-bold">
                                {usePriceFormated(product.price)}
                            </span>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="number-input"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Quantity:
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                    <input
                                        type="number"
                                        id="quantity"
                                        aria-describedby="helper-text-explanation"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        min="1"
                                        name="quantity"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                    <button
                                        className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ProductDetail;
