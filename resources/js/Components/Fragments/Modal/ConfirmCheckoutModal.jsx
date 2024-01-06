import PrimaryButton from "@/Components/Elements/Button/PrimaryButton";
import SecondaryButton from "@/Components/Elements/Button/SecondaryButton";
import { Modal } from "flowbite-react";

const ConfirmCheckoutModal = ({
    handleSubmit,
    openCheckoutModal,
    setOpenCheckoutModal,
}) => {
    return (
        <Modal
            show={openCheckoutModal}
            size="xl"
            onClose={() => setOpenCheckoutModal(false)}
            popup
        >
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="mx-auto mb-4 h-14 w-14 text-gray-400"
                    >
                        <title>alert-outline</title>
                        <path d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" fill="gray" />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                        Are you sure you want to checkout this product?
                    </h3>
                    <div className="flex justify-center">
                        <form onSubmit={handleSubmit}>
                            <PrimaryButton type="submit" className="ms-2">
                                Ya
                            </PrimaryButton>
                        </form>
                        <SecondaryButton
                            className="ms-2"
                            onClick={() => setOpenCheckoutModal(undefined)}
                        >
                            Tidak
                        </SecondaryButton>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmCheckoutModal;
