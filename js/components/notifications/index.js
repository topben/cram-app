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
                    <Button transparent onPress={() => this.replaceRoute('scanner')}>
                        <Icon name="md-close" />
                    </Button>
                    <Title><Icon name="md-notifications" /></Title>
                </Header>

                <Content style={{backgroundColor: 'transparent'}}>
                    <List>
                        <ListItem iconLeft button onPress={() => this.replaceRoute('comments')}>
                            <Icon name="ios-people"/>
                            <Text >Daily Stand Up</Text>
                            <Text note>10:00 AM</Text>
                        </ListItem>
                      <ListItem iconLeft>
                          <Icon name="ios-flag"/>
                          <Text>Finish list Screen</Text>
                          <Text note>By 2:00 PM</Text>
                      </ListItem>
                      <ListItem iconLeft>
                          <Icon name="ios-restaurant"/>
                          <Text>Lunch Break</Text>
                          <Text note>2:00 PM</Text>
                          <Badge>2</Badge>
                      </ListItem>
                      <ListItem iconLeft>
                        <Icon name="ios-megaphone"/>
                          <Text>Discussion With Client</Text>
                          <Text note>6:00 PM</Text>
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
