import React, { useState } from "react";

import countryList from 'react-select-country-list'
import {Form, Input, Icon, Select, PageHeader} from 'antd';

const {Option} = Select;
const options = countryList().getData().map((el, index) => <Option key={index} value={el.value}>{el.label}</Option>);

export default (props) => {
    const [editing, setEditing] = useState(false);
    const onChange = () => setEditing(!editing);
    const extra = editing ? <Icon key="stopButton" type="stop" onClick={onChange}/> : <Icon key="editButton" type="edit" onClick={onChange}/>;
    const {getFieldDecorator} = props.form;
    const onSelect = (country) => props.setActiveCountry(country);
    return (
        <PageHeader
            style={props.pageHeaderStyle}
            title="Bank transfer"
            extra={[extra]}
        >
            <Form.Item
                label={<span>
                            Bank name&nbsp;
                        </span>}
            >
                {getFieldDecorator('bankName', {
                    initialValue: '',
                    rules: [
                            {
                                required: true,
                                message: 'Please input Bank name!',
                                whitespace: true
                            }
                        ],
                },)(<Input disabled={!editing}/>)}
            </Form.Item>

            <Form.Item label="Account number" hasFeedback>
                {getFieldDecorator('accountNumber', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            pattern: /^[A-Z]{2}[0-9A-Z]*$/,
                            message: 'Please input correct IBAN!',
                            whitespace: false,
                            transform: (value) => value.replace(/ +/g, "")
                        }
                    ],
                })(<Input.Password disabled={!editing}/>)}
            </Form.Item>

            <Form.Item
                label={<span>
                            SWIFT&nbsp;
                        </span>}
            >
                {getFieldDecorator('swift', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            message: 'Please input correct SWIFT!',
                            whitespace: false,
                            min: 5,
                            max: 10
                        }
                    ],
                },)(<Input disabled={!editing}/>)}
            </Form.Item>

            <Form.Item label="Bank ID" hasFeedback>
                {getFieldDecorator('bankId', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            message: 'Please input correct Bank ID!',
                            whitespace: false,
                            min: 5,
                            max: 10
                        }
                    ],
                })(<Input.Password disabled={!editing}/>)}
            </Form.Item>

            <Form.Item
                label={<span>
                            Bank Address&nbsp;
                        </span>}
            >
                {getFieldDecorator('bankAddress', {
                    initialValue: '',
                    rules: [
                        {
                            required: true,
                            message: 'Please input Bank Address!',
                            whitespace: true
                        }],
                },)(<Input disabled={!editing}/>)}
            </Form.Item>


            <Form.Item
                label={<span>
                            Country&nbsp;
                        </span>}
            >
                <Select
                    disabled={!editing}
                    showSearch
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onSelect={onSelect}
                >
                    {options}
                </Select>
            </Form.Item>
        </PageHeader>
    );
}