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
import {popRoute, replaceRoute ,pushNewRoute} from '../../actions/route';

import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Footer} from 'native-base';
import FooterComponent from "./../footer";
import CalendarPicker from 'react-native-calendar-picker';

import styles from './styles';
import calendar from './calendar-theme';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
        this.state= {
            date: new Date(),
            title: '孩子的行事曆', // Switchable Title( Teacher / Parent )
            children_attendances : [], // Parent's View
            student_attendances: [] // Teacher's View
        };
    }

    navigateTo(route) {
        this.props.replaceRoute(route);
    }

    onDateChange (date) {
        this.setState({ date: date });
    }

    popRoute() {
        this.props.popRoute();
    }

    componentWillMount(){
      // temp object for list
      var attendance = new Object();
      attendance.isLeave = true; //請假
      attendance.class_time = '6:00~7:00 PM';
      attendance.class_name = '兒童英語對話 A班';
      attendance.student_name = '王小明';

      children_attendances.push(attendatce);
    }

    render() {
        return (
            <Container theme={calendar} style={{backgroundColor: '#f5f6f7'}}>
                <Header style={{borderColor:"rgba(181, 181, 181, 0.34)",borderBottomWidth:1.1,height:70}}>
                  <Button transparent onPress={() => this.navigateTo('scanner')}>
                    <Image source={require('../../../images/button/btn_back.png')}/>
                  </Button>
                    <Text style={styles.topTitle}>{this.state.title}</Text>
                </Header>
                <Content padder style={{backgroundColor: '#f5f6f7'}}>
                  <View style={{borderColor:"rgba(181, 181, 181, 0.34)",borderBottomWidth:1.1,marginBottom:-10}}>
                    <CalendarPicker
                        style={{textColor:'#000'}}
                        selectedDate={this.state.date}
                        selectedBackgroundColor={'#000'}
                        onDateChange={this.onDateChange.bind(this)}/>
                  </View>
                  <List style={{paddingTop:30}}>
                    {(this.state.children_attendances.length != 0)?this.state.children_attendances.map((i, index)=>
                      <ListItem iconLeft button>
                          <Icon name="ios-people" style={{color: '#ff6100'}}/>
                          <View style={{paddingLeft:30}}>
                          <Text numberOfLines={2}>{i}</Text>
                          </View>
                      </ListItem>
                    ):<View><Text style={{alignSelf:'center'}}>No Attendance</Text></View>}
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
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Calendar);
