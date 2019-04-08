'use strict'

import * as React from 'react'
import Layout from '../components/layout'
import CarPriceForm, { CarPriceState } from '../components/carpriceform'

export default class Index extends React.Component<{}, CarPriceState> {
    constructor(props) {
        super(props);

        this.state = {
            makes: [],
            models: [],
            value: "",
            baseValue: "",
            percentage: "",
            serverWaiting: false
        };
    }

    getMakes = async () => {
        const response = await fetch("http://127.0.0.1:8081/makes", {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        const content = await response.json();
        this.setState({makes: content.makes});
    }

    getModels = async (make: string) => {
        if(make && make.length > 0) {
            this.setState({serverWaiting: true, models: []});
            const response = await fetch("http://127.0.0.1:8081/models/" + make, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            const content = await response.json();
            this.setState({serverWaiting: false, models: content.models});
        } else {
            this.setState({models: []});
        }
    }

    getValue = async (make: string, model: string, age: number, owners: number, mileage: number, collisions: number) => {
        this.setState({serverWaiting: true, value: "Submitting...", baseValue: "", percentage: ""});
        let query = "";
        if(mileage || collisions) {
            query = "?";
            if(mileage) {
                query += "mileage=" + mileage;
            }
            if(collisions) {
                if(mileage) {
                    query += "&";
                }
                query += "collisions=" + collisions;
            }
        }

        const response = await fetch("http://127.0.0.1:8081/value/" + make + "-" + model + "-" + age + "-months-" + owners + "-owners" + query, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        const content = await response.json();

        this.setState({serverWaiting: false, value: "$" + content.value, baseValue: "$" + content.baseValue, percentage: content.percentage + "%"})
    }

    clearValue = () => {
        this.setState({value: "", baseValue: "", percentage: ""});
    }

    render() {
        let carPriceForm = <div>Loading...</div>;
        if(this.state.makes.length > 0) {
            carPriceForm = <CarPriceForm {...this.state} getModels={this.getModels} getValue={this.getValue} clearValue={this.clearValue} />;
        } else {
            this.getMakes();
        }

        return (
            <Layout>
                <h1>Get Your Car Prices Here!</h1>
                {carPriceForm}
            </Layout>
        );
    }
}
