import React, { Component } from 'react';
import Heading from './Heading';

export default class App extends Component {
    static displayName = App.name;

    constructor(props)
    {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount()
    {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts)
    {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>                      
                        <th>Temp. (C)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>

            </table>
        );
    }

    render()
    {
        let contents = this.state.loading
            ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
            : App.renderForecastsTable(this.state.forecasts);

        return (
            <div>
                <Heading/>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        //New
        //'https://jsonplaceholder.typicode.com/todos/1'
        const response = await fetch('weatherforecast');
       // const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data)
        this.setState({ forecasts: data, loading: false });
    }
}
