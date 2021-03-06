/**
 * @autor Vanderson de Moura Vauruk
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {
    Dimensions,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'
import * as homeActions from '../../redux/actions/home'
import {
    Text,
    Container,
    Content,
    Input,
    Spinner,
    Thumbnail
} from 'native-base'

import FooterApp from './footer'

import _ from 'lodash'

import Detail from './detail'

const PRIMARY_COLOR = '#d42026'
const WHITE = '#ffffff'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCharacter: undefined,
            showModal: false,
            item: undefined
        }
    }

    UNSAFE_componentWillMount = () => {
        this.props.listCharacterAction()
    }




    handleSearch = (name) => {
        this.props.navOffSetAction(0)
        this.setState({ nameCharacter: name })
        if (name && name.length > 2 || name.length == 0) {
            this.props.setOffSetAction(0)
            this.props.listCharacterAction(name)
        }
    }

    showModalDetail = (item) => {
        console.log("Click me", item)
        this.setState({ showModal: !this.state.showModal, item })
    }

    render() {
        const { listCharacter, loading } = this.props
        return (
            <Container>
                <Content>
                    <Detail showModal={this.state.showModal} item={this.state.item} showModalDetail={() => this.showModalDetail()} />
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
                            <Row style={{ marginTop: 5, borderTopWidth: 2, borderTopColor: PRIMARY_COLOR, width: '17%' }}>
                            </Row>
                            <Row>
                                <Text style={[styles.fontDefault, { marginTop: 12, fontWeight: 'bold' }]}>Nome do Personagem</Text>
                            </Row>
                            <Row>
                                <Input
                                    value={this.state.nameCharacter}
                                    placeholderTextColor={PRIMARY_COLOR}
                                    style={{ fontSize: 16, borderColor: 'gray', color: PRIMARY_COLOR, borderRadius: 8, borderWidth: 1, marginBottom: 12 }}
                                    autoCapitalize='none'
                                    onChangeText={(name) => this.handleSearch(name)}
                                />
                            </Row>
                        </Grid>
                    </View>
                    <View style={{ backgroundColor: PRIMARY_COLOR }}>
                        <Grid>
                            <Row>
                                <Col>
                                    <Text style={[styles.fontDefault, {
                                        color: '#fff',
                                        padding: 20,
                                        paddingLeft: '55%',
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
                        <ItemChar key={index} item={item} showModalDetail={this.showModalDetail} />
                    )}
                </Content>
                <FooterApp nameCharacter={this.state.nameCharacter} />
            </Container >
        );
    }
}

const mapStateToProps = (state) => ({
    listCharacter: state.home.listCharacter,
    loading: state.home.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(homeActions, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Home);

const ItemChar = ({ item, showModalDetail }) => {
    return <TouchableOpacity
        style={{ borderBottomColor: PRIMARY_COLOR, borderBottomWidth: 1 }
        }
        onPress={() => showModalDetail(item)}
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    gridCenter: {
        // justifyContent: 'center',
        alignItems: 'center',
        color: PRIMARY_COLOR,
    },
    fontDefault: {
        fontSize: 16,
        color: PRIMARY_COLOR,
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
    wrapperPopup: {
        backgroundColor: WHITE,
        width: '90%',
        borderRadius: 10,
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        paddingBottom: 20,
        position: 'relative',
    },
    bodyPopup: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    modalHeaderLight: {
        padding: 18,
        textTransform: 'capitalize',
        textAlign: 'center',
        borderBottomColor: PRIMARY_COLOR,
        borderBottomWidth: 1,
        fontSize: 20,
        color: PRIMARY_COLOR
    },
    buttonCancel: {
        marginTop: 50,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 50,
        height: 50,
        marginLeft: '15%',
        marginRight: '15%',
    },

});
