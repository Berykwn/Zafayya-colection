import { Link } from "@inertiajs/react";

import MainLayout from "@/Layouts/MainLayout";
import ProductCard from "@/Components/Fragments/ProductCard";

const Home = ({ products, auth }) => {
    return (
        <MainLayout title="Home" auth={auth} page={"home"}>
            <div className="lg:px-28">
                <div className="lg:pt-8 md:py-4">
                    <img
                        src="http://127.0.0.1:8000/img/banner.png"
                        alt="banner"
                        className="rounded-lg w-full h-[500px]"
                    />
                </div>

                <div className="my-12 text-center">
                    <h1 className="text-gray-600 text-2xl md:text-3xl font-extrabold px-2 lg:px-0 font-[cursive]">
                        New product
                    </h1>
                    <hr className="w-48 h-1 mx-auto bg-stone-200 border-0 rounded my-4" />
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 lg:px-0">
                        {products.map((item) => (
                            <ProductCard key={item.id} {...item} />
                        ))}
                    </div>
                ) : (
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        <span className="font-medium">Not Found!</span> Change a
                        few things up and try submitting again.
                    </div>
                )}

                <div className="flex justify-center pt-10">
                    <Link
                        href={route("products")}
                        as="button"
                        className="text-emerald-500 hover:text-white border border-emerald-500 hover:bg-emerald-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        See All Product
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
