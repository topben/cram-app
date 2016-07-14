/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { Image ,TextInput } from 'react-native';
import {popRoute} from '../../actions/route';
import {closeDrawer} from '../../actions/drawer';
import {replaceOrPushRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';

const {User} = require('NativeModules');
const Realm = require('realm');



const UserSchema = {
    name: 'User',
    primaryKey: 'i_user_id',
    properties: {
        i_user_id: {type: 'int', default: 0},
        s_name: {type: 'string', default: ''},
        s_username: {type: 'string', default: ''},
        s_password: {type: 'string', default: ''},
        s_email: {type: 'string', default: ''},
        s_phone: {type: 'string', default: ''},
        s_invitationCode: {type: 'string', default: ''},
        s_permission: {type: 'string', default: ''},
        i_scannerUsage: {type: 'int', default: 0},
        s_profileImage: {type: 'string', default: ''},
        b_isTeacher: {type: 'bool', default: false},
        b_isParent: {type: 'bool', default: false},
        b_isDelete: {type: 'bool', default: false}
    },
};

const realm = new Realm({schema: [UserSchema]});

const CourseSchema = {
    name: 'Course',
    primaryKey: 'i_course_id',
    properties: {
        i_course_id: {type: 'int', default: 0},
        s_name: {type: 'string', default: ''},
        s_dayOfTheWeek: {type: 'string', default: ''},
        s_company: {type: 'string', default: ''},
        NSDate_startTime: {type: 'date', optional: true},
        NSDate_endTime: {type: 'date', optional: true},
        NSDate_checkInTime: {type: 'date', optional: true},
        NSDate_lateTime: {type: 'date', optional: true},
        User_instructor: {type: 'UserModel', optional: true},
        List_students: {type: 'list', objectType: 'StudentModel'},
        b_isDelete: {type: 'bool', default: false}
    },
};

 const StudentSchema = {
     name: 'Student',
     primaryKey: 'i_student_id',
     properties: {
         i_student_id: {type: 'int', default: 0},
         s_name: {type: 'string', default: ''},
         s_student_qrCode: {type: 'string', default: ''},
         s_profileImage: {type: 'string', default: ''},
         List_courses: {type: 'list', objectType: 'CourseModel'},
         List_checkInHistory: {type: 'list', objectType: 'AttendanceModel'},
         b_isDelete: {type: 'bool', default: false}
     },
 };

 const AttendanceSchema = {
     name: 'Attendance',
     primaryKey: 'i_attendance_id',
     properties: {
         i_attendance_id: {type: 'int', default: 0},
         i_course_id: {type: 'int', default: 0},
         NSDate_date: {type: 'date', optional: true},
         b_attend: {type: 'bool', default: false},
         b_leave: {type: 'bool', default: false},
         b_isDelete: {type: 'bool', default: false}
     },
 };


class LoginAccount extends Component {
  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.testRealmLogin = this.testRealmLogin.bind(this);
      this.state = {
          username: '',
          password: ''
      };
  }

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    testRealmLogin() {
      User.login(this.state.username, '',this.state.password,'',
             function successCallback(results) {
                 alert(results.message);
             },

             function errorCallback(results) {
                 //alert('Error: ' + results);
             });

      // realm.write(() => {
      //   realm.create('User', {i_user_id: 300, s_name: 'ben', s_username: 'ben@tmotx.com',
      //   s_password: '123456', s_email: 'ben@tmotx.com', s_phone: '0900-000-000', s_invitationCode: 'abc123',
      //   s_verificationCode: '123456', s_profileImage: '', b_isDelete: false});
      // });

    }

    // next button tapped
    onNextPressed(){
      //this.setState({client_error_msg: '成功'});
      this.navigateTo('login');
    }

    render() {
      console.log(Realm.defaultPath);

        return (
            <Container theme={theme} style={{backgroundColor:'#ffffff'}}>
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>登入</Title>
                      <Button transparent onPress={this.onNextPressed}>
                          Next
                      </Button>
                </Header>

                <Content padder style={{backgroundColor: 'transparent'}}>
                    <View padder>
                      <Text>輸入帳號</Text>
                        <View style={styles.mb20}>
                            <Input placeholder="ex:0912345678" onChangeText={(username) => this.setState({username})} value={this.state.username}/>
                        </View>
                        <Text>輸入密碼</Text>
                        <View style={styles.mb20}>
                            <Input placeholder="password" onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                        </View>
                    </View>
                    <Button
                      style={styles.btn}
                      onPress={this.testRealmLogin}>
                      <Text style={styles.txt}>
                        測試Realm
                      </Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(LoginAccount);
