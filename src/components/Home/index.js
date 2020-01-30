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
import { Dimensions, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'
import * as homeActions from '../../redux/actions/home'
import {
    Text,
    Container,
    Content,
    Input,
    Spinner,
    Footer,
    FooterTab,
    Button,
    Icon,
    Thumbnail
} from 'native-base'

import _ from 'lodash'

const COLOR_PRIMARY = '#d42026'
const WHITE = '#ffffff'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCharacter: undefined
        }
    }

    UNSAFE_componentWillMount = () => {
        this.props.listCharacterAction()
    }

    componentDidUpdate = (prevProps) => {
        if (!_.isEqual(this.props.offset, prevProps.offset) && this.props.offset >= 0) {
            this.props.listCharacterAction(this.state.nameCharacter)
        }
    }


    handleSearch = (name) => {
        this.props.navOffSetAction(0)
        this.setState({ nameCharacter: name })
        if (name && name.length > 2) {
            this.props.setOffSetAction(0)
            this.props.listCharacterAction(name)

        }
    }
    /**
     * Responsavel para avancar e voltar na pesquisa
     */
    filterForwardBack = (number) => {
        this.props.setOffSetAction(number)
    }

    render() {
        const { listCharacter, loading, offset, footerNav } = this.props
        return (
            <Container>
                <Content>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBotton: 12
                    }}>
                        <Grid style={{ width: '80%' }}>
                            <Row>
                                <Text style={[styles.fontDefault, { lineHeight: 19, fontWeight: 'bold', opacity: 100, marginTop: 12 }]}>BUSCA MARVEL </Text>
                                <Text style={[styles.fontDefault, { lineHeight: 19, marginTop: 12 }]}> TESTE FRONT-END</Text>
                            </Row>
                            <Row style={{ marginTop: 5, borderTopWidth: 2, borderTopColor: COLOR_PRIMARY, width: '17%' }}>
                            </Row>
                            <Row>
                                <Text style={[styles.fontDefault, { marginTop: 12, fontWeight: 'bold' }]}>Nome do Personagem</Text>
                            </Row>
                            <Row>
                                <Input
                                    value={this.state.nameCharacter}
                                    placeholderTextColor={COLOR_PRIMARY}
                                    style={{ fontSize: 16, borderColor: 'gray', color: COLOR_PRIMARY, borderRadius: 8, borderWidth: 1, marginBottom: 12 }}
                                    autoCapitalize='none'
                                    onChangeText={(name) => this.handleSearch(name)}
                                />
                            </Row>
                        </Grid>
                    </View>
                    <View style={{ backgroundColor: COLOR_PRIMARY }}>
                        <Grid>
                            <Row>
                                <Col>
                                    <Text style={[styles.fontDefault, {
                                        color: '#fff',
                                        padding: 20,
                                        paddingLeft: '40%',
                                        fontWeight: 'bold'
                                    }]}>Nome</Text>
                                </Col>
                                <Col>
                                    {
                                        loading &&
                                        <Spinner style={{ paddingTop: 5 }} color={'#ffffff'} size="small" />
                                    }
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                    {listCharacter.map((item, index) =>
                        <TouchableOpacity
                            key={index}
                            style={{ borderBottomColor: COLOR_PRIMARY, borderBottomWidth: 1 }}
                            onPress={() => console.log("Click me")}
                            activeOpacity={0.8}
                        >
                            <Grid>
                                <Row style={{ margin: 30 }}>
                                    <Col style={{ width: '25%' }}>
                                        <Thumbnail source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} />
                                    </Col>
                                    <Col style={{
                                        justifyContent: 'center',
                                    }}>
                                        <Text>{item.name}</Text>
                                    </Col>
                                </Row>
                            </Grid>
                        </TouchableOpacity>
                    )}
                </Content>
                <Footer style={{ backgroundColor: WHITE, marginBottom: 24 }}>
                    <FooterTab>
                        <Button disabled={offset === 0} transparent transparent onPress={() => this.filterForwardBack(-4)}>
                            <Icon type={'FontAwesome'} name="chevron-left" size={100} style={{ color: offset === 0 ? 'gray' : COLOR_PRIMARY }} />
                        </Button>
                        {
                            footerNav && footerNav.map((item, index) =>
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        height: '50%',
                                        paddingBottom: 5,
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        borderColor: COLOR_PRIMARY,
                                        borderWidth: 1,
                                        margin: 21,
                                        backgroundColor: offset === item ? COLOR_PRIMARY : WHITE,
                                        borderRadius: 50
                                    }}
                                    onPress={() => this.props.navOffSetAction(item)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={{
                                        color: offset === item ? WHITE : COLOR_PRIMARY, fontSize: 22,
                                        borderColor: COLOR_PRIMARY, marginTop: 10
                                    }}>{(item / 4) + 1}</Text>
                                </TouchableOpacity>
                            )
                        }
                        <Button disabled={listCharacter.length <= 0} transparent onPress={() => this.filterForwardBack(4)} >
                            <Icon type={'FontAwesome'} name="chevron-right" size={100} style={{ color: listCharacter.length <= 0 ? 'gray' : COLOR_PRIMARY }} />
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    listCharacter: state.home.listCharacter,
    loading: state.home.loading,
    footerNav: state.home.footerNav,
    offset: state.home.offset,
});

const mapDispatchToProps = dispatch => bindActionCreators(homeActions, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    fontDefault: {
        fontSize: 16,
        color: COLOR_PRIMARY,
    },
    footer: {
        // flex: 1,
        alignItems: 'center',
        resizeMode: 'contain',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 0,
        ...ifIphoneX({
            height: 90,
        }, {
            height: 90,
        }),
    },
});
