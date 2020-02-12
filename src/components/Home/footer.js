/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {
    Platform,
    TouchableOpacity
} from 'react-native'
import * as homeActions from '../../redux/actions/home'
import {
    Text,
    Footer,
    FooterTab,
    Button,
    Icon,
} from 'native-base'

import _ from 'lodash'

const PRIMARY_COLOR = '#d42026'
const WHITE = '#ffffff'


class FooterApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCharacter: undefined,
            showModal: false,
            item: undefined
        }
    }

    componentDidUpdate = (prevProps) => {
        if (!_.isEqual(this.props.offset, prevProps.offset) && this.props.offset >= 0) {
            this.props.listCharacterAction(this.props.nameCharacter)
        }
    }

    /**
     * Responsavel para avancar e voltar na pesquisa
     */
    filterForwardBack = (number) => {
        this.props.setOffSetAction(number)
    }

    render() {
        const { listCharacter, offset, footerNav } = this.props
        return (
            <Footer style={{ backgroundColor: WHITE }}>
                <FooterTab style={{
                    backgroundColor: WHITE, justifyContent: 'center',
                    alignItems: 'center', flex: 1
                }} >
                    <Button disabled={offset === 0} transparent transparent onPress={() => this.filterForwardBack(-4)}>
                        <Icon type={'FontAwesome'} name="chevron-left" size={100} style={{ color: offset === 0 ? 'gray' : PRIMARY_COLOR }} />
                    </Button>
                    {
                        footerNav && footerNav.map((item, index) =>
                            <TouchableOpacity
                                key={index}
                                style={{
                                    height: Platform.OS === 'ios' ? '50%' : '70%',
                                    paddingBottom: 5,
                                    paddingTop: Platform.OS === 'ios' ? 0 : 5,
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                    borderColor: PRIMARY_COLOR,
                                    borderWidth: 1,
                                    margin: 21,
                                    backgroundColor: offset === item ? PRIMARY_COLOR : WHITE,
                                    borderRadius: 50
                                }}
                                onPress={() => this.props.navOffSetAction(item)}
                                activeOpacity={0.8}
                            >
                                <Text style={{
                                    color: offset === item ? WHITE : PRIMARY_COLOR,
                                    fontSize: 22,
                                    borderColor: PRIMARY_COLOR,
                                    marginTop: Platform.OS === 'ios' ? 10 : 0,
                                    marginBottom: Platform.OS === 'ios' ? 0 : 5
                                }}>{(item / 4) + 1}</Text>
                            </TouchableOpacity>
                        )
                    }
                    <Button disabled={listCharacter.length <= 0} transparent onPress={() => this.filterForwardBack(4)} >
                        <Icon type={'FontAwesome'} name="chevron-right" size={100} style={{ color: listCharacter.length <= 0 ? 'gray' : PRIMARY_COLOR }} />
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

const mapStateToProps = (state) => ({
    listCharacter: state.home.listCharacter,
    footerNav: state.home.footerNav,
    offset: state.home.offset,
});

const mapDispatchToProps = dispatch => bindActionCreators(homeActions, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(FooterApp);
