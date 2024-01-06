import Paginator from "@/Components/Fragments/Paginator";
import ProductCard from "@/Components/Fragments/ProductCard";
import useSearch from "@/Hooks/useSearch";
import MainLayout from "@/Layouts/MainLayout";

const Product = ({ product, allProduct, auth }) => {
    const { searchKeyword, handleSearchInputChange, filteredData } = useSearch(
        allProduct,
        product.data,
        ["name", "description"],
        ""
    );

    return (
        <MainLayout title="Product" auth={auth} page={"product"}>
            <div className="lg:px-32 lg:py-8 px-2 py-4">
                <h5 className="text-2xl font-bold">Our Product</h5>

                {/* Input search */}
                <input
                    type="text"
                    className="w-full lg:w-1/2 my-4 bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-slate-300 focus:border-slate-500 block"
                    placeholder="Type to search product"
                    value={searchKeyword}
                    onChange={handleSearchInputChange}
                />
                {/* Input search */}

                {filteredData.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredData.map((item) => (
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
                <div className="flex justify-center py-8">
                    <Paginator link={product.links} />
                </div>
            </div>
        </MainLayout>
    );
};

export default Product;
