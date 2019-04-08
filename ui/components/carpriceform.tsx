import * as React from 'react'
import Select from './select'

export interface CarPriceState {
    makes: string[];
    models: string[];
    value: string;
    baseValue: string;
    percentage: string;
    serverWaiting: boolean;
}

interface CarPriceProps extends CarPriceState {
    getModels: (make: string) => void;
    getValue: (make: string, model: string, age: number, owners: number, mileage: number, collisions: number) => void;
    clearValue: () => void;
}

interface CarPriceFormState {
    submitDisabled: boolean;
}

export default class CarPriceForm extends React.Component<CarPriceProps, CarPriceFormState> {
    choices: {
        make: string;
        model: string;
        age: number;
        owners: number;
        mileage: number;
        collisions: number;
    }

    constructor(props: CarPriceProps) {
        super(props);

        this.choices = {
            make: undefined,
            model: undefined,
            age: undefined,
            owners: undefined,
            mileage: undefined,
            collisions: undefined
        };

        this.state = {
            submitDisabled: true
        };
    }

    onChangeChoice = (k: string, v: any) => {
        this.choices[k] = v;
        let submitDisabled = true;
        if(
            k !== 'make' &&
            this.choices.make && this.choices.make.length > 0 &&
            this.choices.model && this.choices.model.length > 0 &&
            (this.choices.age || this.choices.age == 0) &&
            (this.choices.owners || this.choices.owners == 0)
        ) {
            submitDisabled = false;
        }
        this.setState({submitDisabled});
        this.props.clearValue();
    }

    onChangeMake = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.onChangeChoice('make', e.target.value);
        this.props.getModels(e.target.value);
    }
    onChangeModel = (e: React.ChangeEvent<HTMLSelectElement>) => this.onChangeChoice('model', e.target.value);
    onChangeAge = (e: React.ChangeEvent<HTMLInputElement>) => this.onChangeChoice('age', parseInt(e.target.value));
    onChangeOwners = (e: React.ChangeEvent<HTMLInputElement>) => this.onChangeChoice('owners', parseInt(e.target.value));
    onChangeMileage = (e: React.ChangeEvent<HTMLInputElement>) => this.onChangeChoice('mileage', parseInt(e.target.value));
    onChangeCollisions = (e: React.ChangeEvent<HTMLInputElement>) => this.onChangeChoice('collisions', parseInt(e.target.value));

    onSubmit = () => {
        this.props.getValue(
            this.choices.make,
            this.choices.model,
            this.choices.age,
            this.choices.owners,
            this.choices.mileage,
            this.choices.collisions
        );
    }

    render() {
        return(
            <div>
                <label>Make <Select name="make" options={this.props.makes} onChange={this.onChangeMake} disabled={this.props.serverWaiting} /></label><br />
                <label>Model <Select name="model" options={this.props.models} onChange={this.onChangeModel} disabled={this.props.serverWaiting} /></label><br />
                <label>Age (Months) <input type="text" name="age" onChange={this.onChangeAge} disabled={this.props.serverWaiting} /></label><br />
                <label># of Owners <input type="text" name="owners" onChange={this.onChangeOwners} disabled={this.props.serverWaiting} /></label><br />
                <label>Mileage (optional) <input type="text" name="mileage" onChange={this.onChangeMileage} disabled={this.props.serverWaiting} /></label><br />
                <label># of Collisions (optional) <input type="text" name="collisions" onChange={this.onChangeCollisions} disabled={this.props.serverWaiting} /></label><br />
                <input type="button" value="Submit" disabled={this.state.submitDisabled || this.props.serverWaiting} onClick={this.onSubmit} /><br />
                Current Value: {this.props.value}<br />
                Factory Value: {this.props.baseValue}<br />
                Percentage: {this.props.percentage}
            </div>
        );
    }
}
