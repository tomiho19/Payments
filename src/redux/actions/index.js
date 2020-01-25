import CONSTANTS from '../../constants';

export const requestPayment = () => {
    return { type: CONSTANTS.REQUESTED_PAYMENT}
};

export const requestPaymentSuccess = (data) => {
    return { type: CONSTANTS.REQUESTED_PAYMENT_SUCCEEDED, data }
};

export const requestPaymentError = () => {
    return { type: CONSTANTS.REQUESTED_PAYMENT_FAILED }
};

export const fetchPayment = (params) => {
    return { type: CONSTANTS.FETCHED_PAYMENT, params }
};