/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { Image, View } from 'react-native';
import {openDrawer} from '../../actions/drawer';
import {popRoute} from '../../actions/route';

import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Footer} from 'native-base';
import FooterComponent from "./../footer";
import CalendarPicker from 'react-native-calendar-picker';

import styles from './styles';
import calendar from './calendar-theme';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state= {
            date: new Date(),
        };
    }

    onDateChange (date) {
        this.setState({ date: date });
    }

    popRoute() {
        this.props.popRoute();
    }

    render() {
        return (
            <Container theme={calendar} style={{backgroundColor: '#f5f6f7'}}>
                <Header style={{borderColor:'#000',borderBottomWidth:1}}>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>Calendar</Title>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                </Header>
                <Content padder style={{backgroundColor: '#f5f6f7'}}>
                    <CalendarPicker
                        style={{textColor:'#000'}}
                        selectedDate={this.state.date}
                        selectedBackgroundColor={'#000'}
                        onDateChange={this.onDateChange.bind(this)} />
                      <Text style={{marginTop: 5, alignSelf: 'center'}} >
                      Date:  { this.state.date.toString().substr(4,12) }
                    </Text>
                </Content>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(Calendar);
