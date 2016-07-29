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
import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';

import theme from '../../themes/base-theme';
import styles from './styles';


const {Notification} = require('NativeModules');
const {User} = require('NativeModules');
const Realm = require('realm');

class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };
        this.convertTimestamp = this.convertTimestamp.bind(this);
    }

    componentWillMount () {

      var $this = this;

      // get notifications_ids from api call later....
      var notifications_ids = ['0', '1', '2', '3', '4'];
      let realm = new Realm({schema: [realm_schema.NotificationModel,
                                        realm_schema.StudentModel,
                                        realm_schema.CourseModel]});
      var i = 0;
      for(i = 0; i < notifications_ids.length; i++){
        // get note realm object
        var noteObject = realm.objects('NotificationModel').filtered('s_notification_id = "' + notifications_ids[i] + '"')[0];
        var courseObject = realm.objects('CourseModel').filtered('s_course_id = "' + noteObject.s_course_id +'"')[0];
        var studentObject = realm.objects('StudentModel').filtered('s_student_id = "' + noteObject.s_student_id + '"')[0];

        var courseName = courseObject.s_name;
        var studentName = studentObject.s_name;
        var checkInNote = studentName + '尚未抵達' + courseName ;
        console.log(i + ". " + checkInNote);

        var unix_timestamp = noteObject.i_created_at;
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = $this.convertTimestamp(1469750400);
        var notify = new Object();
        notify.note = checkInNote;
        notify.date = date;

        $this.state.notifications.push(notify);
        console.log('notify')
        console.log(notify);
    } // end of for looop


      // Notification.getCheckInNotification(notifications_ids,
      //
      //   function successCallback(results) {
      //
      //       $this.state.notifications = results;
      //   });
    }

    convertTimestamp(timestamp) {
      var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
      		yyyy = d.getFullYear(),
      		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
      		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
      		hh = d.getHours(),
      		h = hh,
      		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
      		ampm = 'AM',
      		time;
      if (hh > 12) {
      		h = hh - 12;
      		ampm = 'PM';
      	} else if (hh === 12) {
      		h = 12;
      		ampm = 'PM';
      	} else if (hh == 0) {
      		h = 12;
      	}
        // ie: 2013-02-18, 8:35 AM
      	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
      return time;
    }

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
                      {this.state.notifications.map((i, index)=>
                        <ListItem iconLeft button>
                            <Icon name="ios-people" style={{color: '#ff6100'}}/>
                            <View style={{paddingLeft:30}}>
                            <Text style={styles.subBlackTxt} numberOfLines={2}>{i.note}</Text>
                            <Text style={styles.timeTxt} note >{i.date}</Text>
                            </View>
                        </ListItem>
                      )}
                    </List>
                </Content>
            </Container>
        )
    }
                  // {this.state.notifications.map((i, index)=>)}
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Notifications);
