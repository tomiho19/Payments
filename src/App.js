import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import { Layout } from 'antd';
import Payments from './containers/Payments';
import {fetchPayment} from "./redux/actions";

const { Content, Footer } = Layout;

function App(props) {
  return (
    <div className="App">
        <Layout className="layout">
            <Content style={{ padding: '50px'}}>
                <Payments {...props}/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    }
};
const mapDispatchToProps = dispatch => ({
    fetchPayment: (params) => dispatch(fetchPayment(params)),
    dispatch
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
