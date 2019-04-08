'use strict'

import React from 'react'
import Link from 'next/link'

const linkStyle = {
    marginRight: 15
}

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <Link href="/">
                    <a style={linkStyle}>Home</a>
                </Link>
                <Link href="/carprice">
                    <a style={linkStyle}>Car Prices</a>
                </Link>
                <Link href="/about">
                    <a style={linkStyle}>About</a>
                </Link>
            </div>
        );
    }
}
