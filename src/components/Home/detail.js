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
    Modal,
    Dimensions,
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'
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

const PRIMARY_COLOR = '#d42026'
const WHITE = '#ffffff'


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    //showModal = { this.state.showModal } item = { item } showModalDetail = { this.showModalDetail }

    render() {
        const { item } = this.props
        return (
            <Modal
                overFullScreen
                transparent
                animationType="fade"
                visible={this.props.showModal}
                onRequestClose={() => this.props.showModalDetail()}>
                <TouchableOpacity
                    style={styles.bodyPopup}
                    activeOpacity={1}
                >
                    <View style={[styles.wrapperPopup, { height: 400 }]}>
                        <Text style={styles.modalHeaderLight} >
                            {item ? item.name : 'Datalhe'}
                        </Text>
                        <Row style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Thumbnail source={{ uri: `${item ? item.thumbnail.path : ''}.${item ? item.thumbnail.extension : ''}` }} />
                        </Row>
                        <Grid>
                            <Row>
                                <Col style={styles.gridCenter}>
                                    <Text style={styles.fontDetail}>Comics</Text>
                                </Col>
                                <Col>
                                    <Text style={styles.fontDetail}> {item ? item.comics.available : '0'}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={styles.gridCenter}>
                                    <Text style={styles.fontDetail}>Stories</Text>
                                </Col>
                                <Col>
                                    <Text style={styles.fontDetail} > {item ? item.stories.available : '0'}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={styles.gridCenter}>
                                    <Text style={styles.fontDetail}>Series</Text>
                                </Col>
                                <Col>
                                    <Text style={styles.fontDetail}> {item ? item.series.available : '0'}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={styles.gridCenter}>
                                    <Text style={styles.fontDetail}>Events</Text>
                                </Col>
                                <Col>
                                    <Text style={styles.fontDetail}> {item ? item.events.available : '0'}</Text>
                                </Col>
                            </Row>
                        </Grid>
                        <Grid>
                            <Row>
                                <Col>
                                    <Button block style={[styles.buttonCancel]} onPress={() => this.props.showModalDetail()}>
                                        <Text style={{ color: WHITE }}>Fechar</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Detail);

const styles = StyleSheet.create({
    gridCenter: {
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2
    },
    fontDetail: {
        color: PRIMARY_COLOR,
        fontSize: 20
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
