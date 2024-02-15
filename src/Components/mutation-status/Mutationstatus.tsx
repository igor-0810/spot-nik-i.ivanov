import React from 'react';
import Snackbar from './Snackbar';


interface MutationStatus {
    loading: boolean,
    error: any,
    success: string
}


const ERRORS_CATEGORIES = {
    VALIDATION: 'validation',
    AUTHENTICATION: 'authentication',
    BAD_REQUEST: 'bad-request'
};


const MutationsStatus = ({ loading, error, success }: MutationStatus) => {


    const [open, setOpen] = React.useState(false);

    let type = 'loading';

    if (error) {
        type = 'error';
    }

    if (success) {
        type = 'success';
    }
    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (loading || error || success) {
            setOpen(true);
        }
    }, [loading, error, success]);

    const getMessage = (snackType) => {
        let message: any = [];
        if (snackType === 'loading') {
            message = [<div>loading</div>];
        }
        if (snackType === 'success') {
            message = [<div>Success</div>];
        }
        if (type === 'error') {

            // if (error.networkError &&
            //     typeof window !== 'undefined' &&
            //     !window.navigator.onLine) {
            //     message = 'Sorry, your browser is offline.'
            // } else {
            //     message = getMessage(error)

            // }

            // message = getMessage(error)
            const {
                graphQLErrors = null,
                message: graphMessage = null,
                // status = null
            } = error || {}

            message = graphMessage

            if (graphQLErrors && graphQLErrors.length > 0) {
                // iterate all GraphQL errors
                for (let i = 0; i < graphQLErrors.length; i += 1) {
                    switch (graphQLErrors[i].extensions.category) {
                        case ERRORS_CATEGORIES.AUTHENTICATION:
                            message = graphMessage

                            break
                        case ERRORS_CATEGORIES.BAD_REQUEST:
                            message = graphMessage

                            break
                        default:
                            message = "Sorry, something went wrong."
                            break
                    }
                }
            }
        }

        return <div>{message}</div>;
    };

    return (// @ts-ignore
        <Snackbar
            type={type}
            open={open}
            message={getMessage(type)}
            close={type !== 'loading'}
            // autoHideDuration={type !== 'loading' ? 50000 : 0}
            onClose={handleClose}
        />
    );
};


export default MutationsStatus;
