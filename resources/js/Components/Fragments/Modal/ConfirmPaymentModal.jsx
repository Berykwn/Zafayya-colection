import { router } from "@inertiajs/react";
import { Modal } from "flowbite-react";
import React from "react";

const ConfirmPaymentModal = (props) => {
    const { openModal, setOpenModal, handleSubmit, id, userName, image, url } =
        props;

    return (
        <Modal
            show={openModal === `pup-up${id}`}
            size="3xl"
            onClose={() => setOpenModal(false)}
            popup
        >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to confirm order Mr. {userName}
                    </h3>
                    <div className="flex justify-center">
                        <img
                            src={`../storage/img/payments/${image}`}
                            alt={image}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-5">
                        <form onSubmit={handleSubmit}>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-lg text-white"
                                onClick={() => {
                                    router.post(url);
                                    setOpenModal(undefined);
                                }}
                            >
                                Confirm
                            </button>
                        </form>
                        <button
                            className="bg-slate-500 hover:bg-slate-600 px-2 py-1 rounded-lg text-white"
                            onClick={() => setOpenModal(undefined)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmPaymentModal;
