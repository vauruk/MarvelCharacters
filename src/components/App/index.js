/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store, { history } from '../../redux/store' //'../../../redux/store';

import {
    Platform,
    StyleSheet,
    NativeModules,
} from 'react-native';

import {
    Container,
    Text,
    StyleProvider,
    Root, Content
} from 'native-base';

import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import Home from '../Home'

class App extends Component {

    render() {
        return (
            <Root>
                <StyleProvider style={getTheme(material)}>
                    <Provider store={store}>
                        <Home />
                    </Provider>
                </StyleProvider>
            </Root>
        );
    }
}

export default App;