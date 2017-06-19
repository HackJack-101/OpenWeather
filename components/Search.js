import React from 'react';
import {TextInput, Button, View, Keyboard, StatusBar, Picker} from 'react-native';
import Style from '../Style';
import {StackNavigator} from 'react-navigation';
import Results from './Results';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Search extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Recherche',
        drawerIcon: ({tintColor}) => (
            <MaterialIcons
                name="search"
                size={24}
                style={{color: tintColor}}
            />
        ),
        title: 'Rechercher une ville'
    };

    constructor(props) {
        super(props);
        this.state = {
            city: 'Bordeaux',
            country: 'FR'
        }
    }

    search() {
        Keyboard.dismiss();
        this.props.navigation.navigate('Results', {city: this.state.city, country: this.state.country});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={Style.container}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({city: text})}
                        style={Style.textInput}
                        value={this.state.city}
                        onSubmitEditing={() => this.search()}
                    />
                    <Picker
                        style={Style.countryPicker}
                        selectedValue={this.state.country}
                        onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                        <Picker.Item label="France" value="FR"/>
                        <Picker.Item label="United Kingdom" value="GB"/>
                        <Picker.Item label="United States" value="US"/>
                    </Picker>
                    <Button style={Style.searchButton} onPress={() => this.search()} title="Rechercher"/>
                </View>
            </View>
        );
    }
}

let navigationStyle = {
    headerStyle: {
        marginTop: 0, //StatusBar.currentHeight,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#4CAF50',
        height: 80
    },
    headerTitleStyle: {
        color: '#FFF',
        marginBottom: 20,
        marginTop: 20
    },
    headerBackTitleStyle: {
        color: '#FFF'
    },
    headerTintColor: '#FFF'
};

export default StackNavigator({
    Search: {
        screen: Search,
        navigationOptions: navigationStyle
    },
    Results: {
        screen: Results,
        navigationOptions: navigationStyle
    }
});