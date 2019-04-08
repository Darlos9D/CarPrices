'use strict'

import React from 'react'
import Layout from '../components/layout'

export default class About extends React.Component {
    render() {
        return (
            <Layout>
                <h1>Car Stuff About Page</h1>
                <p>This site is just a quick little front end so I can refresh myself on how react works.</p>
                <p>It connects to an node.js RESTful API that I made as a pre-interview assessment test.</p>
            </Layout>
        );
    }
}
