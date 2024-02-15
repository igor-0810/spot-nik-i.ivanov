import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledSnackbar, TypedContainer, MessageContainer } from './style';

interface SnackbarProps {
    open: boolean,
    close: boolean,
    anchorOrigin: {
        vertical: string,
        horizontal: string,
    }

    onClose: () => void,
    action: any[]
    message: any,
    type: string
}


const Snackbar = ({
    open,
    close,
    action,
    anchorOrigin,
    message,
    onClose,
    type,
    ...props
}: SnackbarProps) => {
    let icon: any = null;
    switch (type) {
        case 'success':
            icon = <CheckCircleIcon />;
            break;

        case 'info':
            icon = <InfoIcon />;
            break;

        case 'warning':
            icon = <WarningIcon />;
            break;

        case 'error':
            icon = <CancelRoundedIcon />;
            break;

        case 'loading':
            icon = <CircularProgress size={25} />;
            break;
        default:
            icon = <InfoIcon />;
            break;
    }

    let snackbarMessage = message;

    console.log(snackbarMessage, "OD SNACLLLLLLLlllll")

    if (icon) {
        snackbarMessage = (
            <TypedContainer
                // @ts-ignore
                type={type}>
                {icon} <MessageContainer>{message} </MessageContainer>
            </TypedContainer>
        );
    }

    return (
        <StyledSnackbar
            open={open}
            onClose={onClose}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}// @ts-ignore
            type={type}
            autoHideDuration={1000}
            {...props}
        />
    );
};

export default Snackbar;
