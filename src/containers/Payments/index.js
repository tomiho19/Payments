import React, {useState} from "react";

import {Form, Button, Row, Col} from 'antd';
import Bank from './bank';
import Crypto from './crypto';

const BANK = 'bank';
const CRYPTO = 'crypto';
const paymentTypes = {
    [BANK]: BANK,
    [CRYPTO]: CRYPTO
};
const validateFields = {
    [BANK]: ['bankName', 'accountNumber', 'swift', 'bankId', 'bankAddress'],
    [CRYPTO]: ['spr', 'eth', 'btc']
};
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
    hideRequiredMark: true
};
const pageHeaderStyle = {
    width: '35%'
};

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function PaymentsForm(props) {
    const [active, setActive] = useState('');
    const [country, setCountry] = useState('');
    const handleSubmitBank = (e) => handleSubmit(e, paymentTypes[BANK]);
    const handleSubmitCrypto = (e) => handleSubmit(e, paymentTypes[CRYPTO]);
    const handleSubmit = (e, priority) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll(validateFields[priority], (err, values) => {
            if (!err && priority in paymentTypes) {
                const crypto = props.form.getFieldsValue(validateFields[CRYPTO]);
                const bank = props.form.getFieldsValue(validateFields[BANK]);
                crypto['active'] = active;
                bank['country'] = country;
                sendValues({bank, crypto, priority})
            }
        });
    };
    const setActiveCurrency = (active) => setActive(active);
    const setActiveCountry = (country) => setCountry(country);
    const sendValues = (values) => props.fetchPayment(values);
    const {getFieldsError} = props.form;
    return (
        <Form {...formItemLayout} onSubmit={handleSubmit}>
            <Bank {...props}
                  setActiveCountry={setActiveCountry}
                  pageHeaderStyle={pageHeaderStyle}
            />
            <Crypto {...props}
                    setActiveCurrency={setActiveCurrency}
                    pageHeaderStyle={pageHeaderStyle}
            />
            <Row>
                <Col span={24} offset={1} style={{textAlign: 'left'}}>
                    <Button onClick={handleSubmitBank}
                            loading={props.loading}
                            disabled={hasErrors(getFieldsError(validateFields[BANK]))}
                            type="primary">
                        Bank
                    </Button>
                    <Button onClick={handleSubmitCrypto}
                            loading={props.loading}
                            disabled={hasErrors(getFieldsError(validateFields[CRYPTO]))}
                            style={{marginLeft: 8}}>
                        Crypto
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

const Payments = Form.create({name: 'register'})(PaymentsForm);
export default Payments;