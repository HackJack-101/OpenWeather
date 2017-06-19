import React from 'react';
import {Text, ActivityIndicator, ListView, StatusBar} from 'react-native';
import Style from '../Style';
import axios from 'axios';
import WeatherRow from './weather/Row';

export default class Results extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: `Météo / ${navigation.state.params.city}, ${navigation.state.params.country}`
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            city: this.props.navigation.state.params.city,
            country: this.props.navigation.state.params.country,
            report: null
        };
        this.fetchWeather();
    }

    fetchWeather() {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.props.navigation.state.params.city},${this.props.navigation.state.params.country}&units=metric&cnt=10&appid=e4f553a11f62a9878eccbeba481770f4`)
            .then((response) => {
                this.setState({report: response.data});
            })
    }

    render() {
        if (this.state.report === null) {
            return (
                <ActivityIndicator style={Style.aboutView} size="large" animating={true}/>
            );
        } else {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            return (
                <ListView
                    dataSource={ds.cloneWithRows(this.state.report.list)}
                    renderRow={(row, j, index) => <WeatherRow day={row} index={parseInt(index)}/>}
                />
            );
        }
    }
}