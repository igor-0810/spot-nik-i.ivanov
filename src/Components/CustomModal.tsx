import React, { ReactElement, } from "react"
import Modal from "@mui/material/Modal";
import { Button, Box } from "@mui/material"

interface CustomModalProps {
    modalOpen: boolean;
    setModalOpen: (value: boolean) => void;
    children: ReactElement,
    buttonName: string,
    width?: number
}



const CustomModal = ({ children, buttonName, width = 500, modalOpen,
    setModalOpen, }: CustomModalProps) => {

    const style = {

        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: width,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }
    return (
        <div>
            <Button onClick={openModal} color='primary' variant="outlined">{buttonName}</Button>

            <Modal
                open={modalOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    )
}

export default CustomModal
