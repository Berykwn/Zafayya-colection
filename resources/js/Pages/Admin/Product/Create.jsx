import PrimaryButton from "@/Components/Elements/Button/PrimaryButton";
import InputError from "@/Components/Elements/Input/InputError";
import InputLabel from "@/Components/Elements/Input/InputLabel";
import TextInput from "@/Components/Elements/Input/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import React, { useState } from "react";

const Create = ({ auth, errors }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        body: "",
        categories: "",
        price: "",
        stock: "",
        image: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", formValues.name);
        formData.append("description", formValues.description);
        formData.append("body", formValues.body);
        formData.append("categories", formValues.categories);
        formData.append("price", formValues.price);
        formData.append("stock", formValues.stock);
        formData.append("image", selectedImage);

        router.post("/dashboard/product/store", formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setImageUrl(URL.createObjectURL(file));
    };
    return (
        <AdminLayout title="Add new product" page="product" auth={auth}>
            <section className="lg:px-4 px-0 lg:py-0 py-2">
                <h3 className="text-2xl font-semibold mb-4">
                    Form add new product
                </h3>

                <div className="px-8 py-4 bg-white rounded shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col lg:flex-row lg:gap-4">
                            <div className="w-full lg:w-1/2">
                                <div className="my-2">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Product name"
                                        className="mb-2"
                                    />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formValues.name}
                                        onChange={handleChange}
                                        className="my-1 block w-full bg-gray-50 text-sm"
                                        placeholder="Zoya hijab"
                                    />

                                    {errors.name && (
                                        <InputError message={errors.name} />
                                    )}
                                </div>
                                <div className="lg:my-4 my-2">
                                    <InputLabel
                                        htmlFor="categories"
                                        value="Categories"
                                        className="mb-2"
                                    />

                                    <TextInput
                                        id="categories"
                                        type="text"
                                        name="categories"
                                        value={formValues.categories}
                                        onChange={handleChange}
                                        className="mt-1 block w-full bg-gray-50 text-sm"
                                        placeholder="Busana muslimah"
                                    />
                                    {errors.categories && (
                                        <InputError
                                            message={errors.categories}
                                        />
                                    )}
                                </div>
                                <div className="lg:my-4 my-2">
                                    <InputLabel
                                        htmlFor="price"
                                        value="Price"
                                        className="mb-2"
                                    />

                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={formValues.price}
                                        onChange={handleChange}
                                        className="mt-1 block w-full bg-gray-50 text-sm"
                                        placeholder="1000000"
                                    />
                                    {errors.price && (
                                        <InputError message={errors.price} />
                                    )}
                                </div>

                                <div className="lg:my-4 my-2">
                                    <InputLabel
                                        htmlFor="stock"
                                        value="Stock"
                                        className="mb-2"
                                    />
                                    <TextInput
                                        id="stock"
                                        type="number"
                                        name="stock"
                                        value={formValues.stock}
                                        onChange={handleChange}
                                        className="mt-1 block w-full bg-gray-50 text-sm"
                                        placeholder="1"
                                    />
                                    {errors.stock && (
                                        <InputError message={errors.stock} />
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <PrimaryButton type="submit">
                                        Submit
                                    </PrimaryButton>

                                    <Link
                                        href={route("dashboard.product")}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white bg-slate-600 hover:bg-slate-700 tracking-widest transition ease-in-out duration-150"
                                    >
                                        Kembali
                                    </Link>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2">
                                <div className="my-2">
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                        className="mb-2"
                                    />

                                    <TextInput
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={formValues.description}
                                        onChange={handleChange}
                                        className="mt-1 block w-full bg-gray-50 text-sm"
                                        placeholder="Lorem ipsum dolor sit amet.."
                                    />

                                    {errors.description && (
                                        <InputError
                                            message={errors.description}
                                        />
                                    )}
                                </div>
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="body"
                                        value="Body"
                                        className="mb-2"
                                    />
                                    <textarea
                                        id="body"
                                        type="text"
                                        name="body"
                                        value={formValues.body}
                                        onChange={handleChange}
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Write body here..."
                                    ></textarea>
                                    {errors.body && (
                                        <InputError message={errors.body} />
                                    )}
                                </div>
                                <div className="mb-4">
                                    {imageUrl && (
                                        <img
                                            src={imageUrl}
                                            alt="Selected"
                                            className="object-cover w-1/2 h-1/2 rounded-md mb-2"
                                        />
                                    )}

                                    <InputLabel
                                        htmlFor="image"
                                        value="Product image"
                                        className="mb-2"
                                    />

                                    <TextInput
                                        type="file"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    />

                                    <p className="mt-1 text-sm text-gray-500">
                                        PNG, JPG, or JPEG (MAX. 2mb).
                                    </p>

                                    {errors.image && (
                                        <InputError message={errors.image} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </AdminLayout>
    );
};

export default Create;
