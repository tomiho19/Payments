import React, {useState} from "react";

import {Form, Input, Icon, PageHeader, Checkbox } from 'antd';
const BTC = 'btc';
const ETH = 'eth';
const SPR = 'spr';

export default (props) => {
    const {getFieldDecorator} = props.form;
    const [editing, setEditing] = useState(false);
    const [active, setActive] = useState('');
    const [sprChecked, setSprChecked] = useState(false);
    const [ethChecked, setEthChecked] = useState(false);
    const [btcChecked, setBtcChecked] = useState(false);
    const onChangeSprChecked = (e) => {
        e.stopPropagation();
        const checked = e.target.checked;
        const active = checked ? 'spr' : '';
        setSprChecked(!sprChecked);
        setActive(active);
        props.setActiveCurrency(active)
    };
    const onChangeEthChecked = (e) => {
        e.stopPropagation();
        const checked = e.target.checked;
        const active = checked ? 'eth' : '';
        setEthChecked(!checked);
        setActive(active);
        props.setActiveCurrency(active)
    };
    const onChangeBtcChecked = (e) => {
        e.stopPropagation();
        const checked = e.target.checked;
        const active = checked ? 'btc' : '';
        setBtcChecked(!checked);
        setActive(active);
        props.setActiveCurrency(active)
    };

    const onChange = () => setEditing(!editing);
    const extra = editing ? <Icon key="stopButton" type="stop" onClick={onChange}/> : <Icon key="editButton" type="edit" onClick={onChange}/>;
    return (
        <PageHeader
            style={props.pageHeaderStyle}
            title="Crypto"
            extra={[extra]}
        >
            <Form.Item
                label={<Checkbox disabled={!editing} checked={active === BTC} onChange={onChangeBtcChecked}>
                    BTC
                </Checkbox>}
            >
                {getFieldDecorator('btc', {
                    initialValue: '',
                    rules: [
                        {
                            required: btcChecked,
                            type: 'string',
                            message: 'Please input correct string value!',
                            whitespace: false,
                        }],
                },)(<Input disabled={!editing}/>)}
            </Form.Item>
            <Form.Item
                label={<Checkbox disabled={!editing} checked={active === ETH} onChange={onChangeEthChecked}>
                    ETH
                </Checkbox>}
            >
                {getFieldDecorator('eth', {
                    initialValue: '',
                    rules: [
                        {
                            required: ethChecked,
                            type: 'string',
                            message: 'Please input correct string value!',
                            whitespace: false,
                        }],
                })(<Input disabled={!editing}/>)}
            </Form.Item>
            <Form.Item
                label={<Checkbox disabled={!editing} checked={active === SPR} onChange={onChangeSprChecked}>
                    SPR
                </Checkbox>}
            >
                {getFieldDecorator('spr', {
                    initialValue: '',
                    rules: [
                        {
                            required: sprChecked,
                            type: 'string',
                            message: 'Please input correct string value!',
                            whitespace: false,
                        }],
                })(<Input disabled={!editing}/>)}
            </Form.Item>
        </PageHeader>
    );
}