'use strict'

import React from 'react'

interface SelectProps {
    name: string;
    options: string[];
    disabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default class Select extends React.Component<SelectProps> {
    render() {
        let items = [<option key={0} value={""} />];
        if(this.props.options) {
            for (let i = 0; i < this.props.options.length; i++) {             
                items.push(<option key={i+1} value={this.props.options[i]}>{this.props.options[i]}</option>);   
            }
        }

        return (
            <select name={this.props.name} onChange={this.props.onChange} disabled={this.props.disabled}>
                {items}
            </select>
        );
    }
}
