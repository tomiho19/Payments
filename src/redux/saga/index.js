import { takeEvery, put, call } from 'redux-saga/effects';

import axios from "axios";
import openNotificationWithIcon from "../../helpers/openNotificationWithIcon";
import CONSTANTS from '../../constants';
import { requestPayment, requestPaymentSuccess, requestPaymentError} from '../actions';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZGU3Y2E3N2NjZjM2ODAwMTQ0YjQ2ZDciLCJpYXQiOjE1Nzg0NzI4ODUsImV4cCI6MTYwOTU3Njg4NX0.19qEhIhq4-u1SGoQG-9Fbe7X6StCtiXKhWf-C702Eng';
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

export function* watchFetchPayment(){
    yield takeEvery(CONSTANTS.FETCHED_PAYMENT, fetchPaymentAsync);
}

function* fetchPaymentAsync({params}) {
    try {
        yield put(requestPayment());
        const data = yield call(() => {
            return axios.post('http://back.sprinter.io/users/payments', params, config)
                    .then(res => res.json())
            }
        );
        processSuccess();
        yield put(requestPaymentSuccess(data));
    } catch (error) {
        processError(error);
        yield put(requestPaymentError());
    }
}

function processError(error) {
    openNotificationWithIcon('error', error.message);
}

function processSuccess() {
    openNotificationWithIcon('success', 'Payment has been made')
}