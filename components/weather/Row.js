import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import moment from 'moment';
import 'moment/locale/fr';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

moment.locale('fr');

export default class Row extends React.Component {
    static propTypes = {
        day: React.PropTypes.object,
        index: React.PropTypes.number,
    };

    day() {
        let day = moment(this.props.day.dt * 1000).format('ddd');
        return (
            <Text style={[style.white, style.bold]}>{day.toUpperCase()}</Text>
        );
    }

    icon(size = 50) {
        const type = this.props.day.weather[0].icon.toLowerCase();
        switch (type) {
            case '01d':
            case '01n':
                // clear sky
                return (
                    <MaterialCommunityIcons
                        name="weather-sunny"
                        size={size}
                        style={{color: '#FFF'}}
                    />
                );
                // few clouds
            case '02d':
            case '02n':
                return (
                    <MaterialCommunityIcons
                        name="weather-partlycloudy"
                        size={size}
                        style={{color: '#FFF'}}
                    />
                );
                // scattered clouds
                // broken clouds
            case '03d':
            case '04d':
            case '03n':
            case '04n':
                return (
                    <MaterialCommunityIcons
                        name="weather-cloudy"
                        size={size}
                        style={{color: '#FFF'}}
                    />
                );
                // shower rain
            case '09d':
            case '09n':
                return (
                    <MaterialCommunityIcons
                        name="weather-pouring"
                        size={size}
                        style={{color: '#FFF'}}
                    />
                );
                break;
            // rain
            case '10d':
            case '10n':
                return (
                    <MaterialCommunityIcons
                        name="weather-rainy"
                        size={size}
                        style={{color: '#FFF'}}
                    />
                );
            // thunderstorm
            case '11d':
            case '11n':
                return (
                    <MaterialCommunityIcons
                        name="weather-lightning"
                        size={size}
                        style={{color: '#FFF'}}
                    />
                );
            // snow
            case '13d':
            case '13n':
                return (
                    <MaterialCommunityIcons
                        name="weather-snowy"
                        size={size}
                        style={{color: '#FFF'}}
                    />
                );
            default:
                return (
                    <Image source={{uri:`http://openweathermap.org/img/w/${this.props.day.weather[0].icon}.png`}} style={{width: size, height: size}}/>
                );
        }
    }

    date() {
        let date = moment(this.props.day.dt * 1000).format('DD/MM');
        return (
            <Text>{date}</Text>
        );
    }

    render() {
        if (this.props.index === 0) {
            return (
                <View style={[style.view, style.flex, style.firstView]}>
                    <View>
                        <Text style={{color: '#FFF'}}>{this.day()} {this.date()}</Text>
                        {this.icon(90)}
                    </View>
                    <Text style={[style.temp, {fontSize: 35}]}>{Math.round(this.props.day.temp.max)}°C / {Math.round(this.props.day.temp.min)}°C</Text>
                </View>
            );
        } else {
            return (
                <View style={[style.view, style.flex]}>
                    <View style={[style.flex]}>
                        {this.icon()}
                        <Text style={{marginLeft: 10}}>{this.day()} {this.date()}</Text>
                    </View>
                    <Text style={style.temp}>{Math.round(this.props.day.temp.max)}°C / {Math.round(this.props.day.temp.min)}°C</Text>
                </View>
            );
        }
    }
}

const style = StyleSheet.create({
    white: {color: '#FFF'},
    bold: {fontWeight: 'bold'},
    flex: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    firstView: {
        backgroundColor: '#03A9F4',
    },
    view: {
        backgroundColor: '#40C4FF',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#0D47A1',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    temp: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 22
    }
});