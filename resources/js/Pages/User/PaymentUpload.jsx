import InputError from "@/Components/Elements/Input/InputError";
import MainLayout from "@/Layouts/MainLayout";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const PaymentUpload = ({ auth, transaction, errors }) => {
    console.log(errors);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [fotoFile, setFotoFile] = useState(null); // Holds the converted photo file

    const [formValues, setFormValues] = useState({
        status: "",
        payment: "",
    });

    useEffect(() => {
        // Populate the form fields with the existing data of the `ternak` prop
        setFormValues({
            status: transaction.status,
        });

        // Fetch the photo and convert it to a file (Blob)
        fetch(`/storage/img/payments/${transaction.payment}`) // Assuming `berita.foto` holds the URL of the photo
            .then((response) => response.blob())
            .then((blob) => {
                setFotoFile(
                    new File(
                        [blob],
                        `/storage/img/payments/${transaction.payment}`,
                        {
                            type: "image/jpeg",
                        }
                    )
                );
            });
    }, [transaction]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("_method", "POST");
        formData.append("status", "Menunggu Konfirmasi");

        // jika ada foto yang dipilih
        if (selectedImage) {
            formData.append("payment", selectedImage);
        } else {
            // upload foto yang lama jika tidak ada payment yang dipilih
            formData.append("payment", fotoFile);
        }

        //url endpoint untuk update
        router.post(`/transaction/payment-upload/${transaction.id}`, formData);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setImageUrl(URL.createObjectURL(file));
    };

    return (
        <MainLayout title="Upload Payment" page="transaction" auth={auth}>
            <div className="lg:px-32 lg:py-8 px-2 py-2">
                <h3 className="text-xl font-bold mb-2">
                    Form Upload Bukti Pembayaran
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    <div className="md:col-span-3">
                        <div className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900">
                                    Bank transfer list
                                </h5>
                            </div>
                            <div className="flow-root">
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-200"
                                >
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-12 h-12"
                                                    src="http://127.0.0.1:8000/img/bri.png"
                                                    alt="Michael image"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    1234-01-123456-12-1
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Zafayya Colection
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-12 h-12"
                                                    src="http://127.0.0.1:8000/img/bsi.png"
                                                    alt="Michael image"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    1234-01-123456-12-1
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Zafayya Colection
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-12 h-12"
                                                    src="http://127.0.0.1:8000/img/bca.png"
                                                    alt="Michael image"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    1234567
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    Zafayya Colection
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-3 mt-4 md:mt-0">
                        <form
                            className="max-w-lg mx-auto"
                            onSubmit={handleSubmit}
                        >
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900"
                                htmlFor="payment_label"
                            >
                                Upload bukti pembayaran
                            </label>

                            <InputError
                                message={errors.payment}
                                className="my-2"
                            />
                            <div className="flex gap-2">
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none placeholder-gray-400"
                                    onChange={handleImageChange}
                                    type="file"
                                />

                                <button
                                    type="submit"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
                                >
                                    Upload
                                </button>
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                                Please upload proof of payment via the virtual
                                account on the side
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default PaymentUpload;
