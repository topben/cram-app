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
import { Image, View } from 'react-native';
import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Badge} from 'native-base';

import theme from '../../themes/base-theme';
import styles from './styles';

class Notifications extends Component {

    popRoute() {
        this.props.popRoute();
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        return (
            <Container theme={theme} style={{backgroundColor: '#FFF'}}>
                <Header>
                  <View></View>
                    <Text style={styles.topTitle}>通知</Text>
                      <Button transparent onPress={() => this.popRoute()}>
                        <Image source={require('../../../images/button/btn_close.png')}/>
                      </Button>
                </Header>

                <Content style={{backgroundColor: 'transparent'}}>
                    <List>
                        <ListItem iconLeft button>
                            <Icon name="ios-people" style={{color: '#ff6100'}}/>
                            <View style={{paddingLeft:30}}>
                            <Text style={styles.subBlackTxt} >兒童英語初級班有新的班級留言</Text>
                            <Text style={styles.timeTxt}note>今天 10:00 AM</Text>
                            </View>
                        </ListItem>
                        <ListItem iconLeft button>
                            <Icon name="ios-people" style={{color: '#ff6100'}}/>
                            <View style={{paddingLeft:30}}>
                            <Text style={styles.subBlackTxt} >兒童英語初級班有新的班級留言</Text>
                            <Text style={styles.timeTxt}note>今天 10:00 AM</Text>
                            </View>
                        </ListItem>
                        <ListItem iconLeft button>
                            <Icon name="ios-people" style={{color: '#ff6100'}}/>
                            <View style={{paddingLeft:30}}>
                            <Text style={styles.subBlackTxt} >兒童英語初級班有新的班級留言</Text>
                            <Text style={styles.timeTxt}note>今天 10:00 AM</Text>
                            </View>
                        </ListItem>
                        <ListItem iconLeft button>
                            <Icon name="ios-people" style={{color: '#ff6100'}}/>
                            <View style={{paddingLeft:30}}>
                            <Text style={styles.subBlackTxt} >兒童英語初級班有新的班級留言</Text>
                            <Text style={styles.timeTxt}note>今天 10:00 AM</Text>
                            </View>
                        </ListItem>
                    </List>
                </Content>
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

export default connect(null, bindAction)(Notifications);
