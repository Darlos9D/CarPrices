'use strict'

import React from 'react'
import Header from './header'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

export default class Layout extends React.Component {
    render() {
        return (
            <div style={layoutStyle}>
                <Header />
                {this.props.children}
            </div>
        );
    }
}
