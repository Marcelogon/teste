import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import MarcaConsulta from './ConsultaMarca';
import HomePage from '../Layout/HomePage';

const { Content } = Layout;

export default class ContentRoutes extends Component {

    state = {}

    render() {
        return (
            <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                    <Route path="/" exact component={HomePage} />

                    <Route path="/marca" component={MarcaConsulta} />

                    

                </div>
            </Content>
        );
    }
}