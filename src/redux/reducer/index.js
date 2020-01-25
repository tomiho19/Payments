const initialState = {
    data: null,
    loading: false,
    error: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUESTED_PAYMENT':
            return {
                loading: true,
                error: false,
            };
        case 'REQUESTED_PAYMENT_SUCCEEDED':
            return {
                data: action.data,
                loading: false,
                error: false,
            };
        case 'REQUESTED_PAYMENT_FAILED':
            return {
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer