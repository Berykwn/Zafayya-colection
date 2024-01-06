import React from "react";
import { Modal } from "flowbite-react";
import { router } from "@inertiajs/react";
import SecondaryButton from "@/Components/Elements/Button/SecondaryButton";
import DangerButton from "@/Components/Elements/Button/DangerButton";

const ConfirmDeleteModal = ({ id, name, url, openModal, setOpenModal }) => {
    return (
        <Modal
            show={openModal === `pup-up${id}`}
            size="xl"
            pupup
            onClose={() => setOpenModal(undefined)}
        >
            <Modal.Body>
                <div className="text-center px-10 pt-10 pb-6">
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                        Are you sure you want to remove the {name} from the cart
                        ?
                    </h3>
                    <div className="flex justify-center gap-2">
                        <DangerButton
                            onClick={() => {
                                router.post(url);
                                setOpenModal(undefined);
                            }}
                        >
                            Confirm
                        </DangerButton>
                        <SecondaryButton
                            onClick={() => setOpenModal(undefined)}
                        >
                            Cancel
                        </SecondaryButton>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmDeleteModal;
