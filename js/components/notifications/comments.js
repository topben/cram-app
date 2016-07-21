/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {openDrawer} from '../../actions/drawer';
import {popRoute,replaceRoute} from '../../actions/route';
// import CodePush from 'react-native-code-push';
import { Image, View, TouchableOpacity } from 'react-native';

import {Container, Header, Title, Content, Text, Button, Icon, Card, CardItem, Thumbnail } from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';

class Comments extends Component {

    popRoute() {
        this.props.popRoute();
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        return (
            <Container theme={theme} style={{backgroundColor: '#fff'}}>
              <Image source={require('../../../images/glow2.png')} style={styles.container} >
                <Header>
                    <Button transparent onPress={() => this.replaceRoute('notifications')}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>Comments</Title>
                </Header>

                <Content style={{backgroundColor: 'transparent'}}>
                    <Card transparent foregroundColor="#000" style={styles.card}>
                      <CardItem style={styles.cardHeader}  header>
                          <Thumbnail source={require('../../../images/contacts/sanket.png')} />
                          <Text>Kumar Sanket</Text>
                          <Text note>StrapMobile</Text>
                          <Text style={styles.date}>Monday 05, 11 AM</Text>
                      </CardItem>

                      <CardItem style={styles.cardItem} >
                          <Text>
                              Before Monday night’s fixture against Newcastle, Leicester are top of the Premier League. Before Monday night’s fixture against Newcastle, Leicester are top of the Premier League.
                          </Text>
                      </CardItem>
                    </Card>

                    <Card transparent foregroundColor="#000" style={styles.card}>
                        <CardItem style={styles.cardHeader}  header>
                            <Thumbnail source={require('../../../images/contacts/pratik.png')} />
                            <Text>Kumar Pratik</Text>
                            <Text note>StrapUI</Text>
                            <Text style={styles.date}>Monday 05, 11 AM</Text>
                        </CardItem>

                        <CardItem style={styles.cardItem} >
                            <Text>
                                Before Monday night’s fixture against Newcastle, Leicester are top of the Premier League.
                            </Text>
                        </CardItem>
                    </Card>
                    <Card transparent foregroundColor="#000" style={styles.card}>
                        <CardItem style={styles.cardHeader}  header>
                            <Thumbnail source={require('../../../images/contacts/pratik.png')} />
                            <Text>Kumar Pratik</Text>
                            <Text note>StrapUI</Text>
                            <Text style={styles.date}>Monday 05, 11 AM</Text>
                        </CardItem>

                        <CardItem style={styles.cardItem} >
                            <Text>
                                Before Monday night’s fixture against Newcastle, Leicester are top of the Premier League.
                            </Text>
                        </CardItem>
                    </Card>
                    <Card transparent foregroundColor="#000" style={styles.card}>
                        <CardItem style={styles.cardHeader}  header>
                            <Thumbnail source={require('../../../images/contacts/pratik.png')} />
                            <Text>Kumar Pratik</Text>
                            <Text note>StrapUI</Text>
                            <Text style={styles.date}>Monday 05, 11 AM</Text>
                        </CardItem>

                        <CardItem style={styles.cardItem} >
                            <Text>
                                Before Monday night’s fixture against Newcastle, Leicester are top of the Premier League.
                            </Text>
                        </CardItem>
                    </Card>
                    <Card transparent foregroundColor="#000" style={styles.card}>
                        <CardItem style={styles.cardHeader}  header>
                            <Thumbnail source={require('../../../images/contacts/pratik.png')} />
                            <Text>Kumar Pratik</Text>
                            <Text note>StrapUI</Text>
                            <Text style={styles.date}>Monday 05, 11 AM</Text>
                        </CardItem>

                        <CardItem style={styles.cardItem} >
                            <Text>
                                Before Monday night’s fixture against Newcastle, Leicester are top of the Premier League.
                            </Text>
                        </CardItem>
                    </Card>
                </Content>
              </Image>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Comments);
