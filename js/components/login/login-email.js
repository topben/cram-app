/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Spinner from './../loaders/Spinner';
// import CodePush from 'react-native-code-push';
import {ScrollView, Image,TextInput,DeviceEventEmitter, Dimensions, Platform, Keyboard, Alert} from 'react-native';
import {popRoute} from '../../actions/route';
import {pushNewRoute, replaceOrPushRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import login from './login-theme';
import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';


const {User} = require('NativeModules');
const Realm = require('realm');

class LoginEmail extends Component {
  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.state = {
          email: '',
          password: '',
          newHeight: 0,
          isProcessing: false,
          btnDisabled: false
      };
  }

    componentWillMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height;
        this.setState({newHeight: newSize});
    }

    keyboardWillHide (e) {
        this.setState({newHeight: 0});
    }

    popRoute() {
        this.props.popRoute();
    }

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    checkUserInput(){
      if(this.state.email == '' && this.state.password =='')
      {
        Alert.alert(
          '',
          '信箱與密碼空白',
          [
            {text: 'OK', onPress: () => {}}
          ]
        )
      }
      else if(this.state.email != '' && this.state.password =='')
      {
        Alert.alert(
          '',
          '密碼空白',
          [
            {text: 'OK', onPress: () => {}}
          ]
        )
      }
      else if(this.state.email == '' && this.state.password != '')
      {
        Alert.alert(
          '',
          '信箱空白',
          [
            {text: 'OK', onPress: () => {}}
          ]
        )
      }
    }

    // next button tapped
    onNextPressed(){
      // for obj connecting
      var $this = this;

      // check user input
      this.checkUserInput();

      //console.log('path =    ' + Realm.defaultPath);
      let realm = new Realm({schema: realm_schema});

      realm.write(() => {
        let allUsers = realm.objects('UserModel');
        realm.delete(allUsers); // Deletes all books
      });

      // Spinner Control
      this.setState({isProcessing: true});
      this.setState({btnDisabled: true});
      // User login Api Call Via Swift Component
      User.login(this.state.email, this.state.password, 'password', global_variables.HOST+'/oauth/token',
       function successCallback(results) {
         $this.setState({isProcessing: false});
         $this.setState({btnDisabled: false});
         // navigate to scanner page
          $this.navigateTo('scanner');
       },
       function errorCallback(results) {
           alert('帳號或是密碼錯誤');
           $this.setState({btnDisabled: false});
           $this.setState({isProcessing: false});
           //alert(results.msg);
       });
    }

    render() {
        return (
            <Container style={{flex:1,backgroundColor:'#f5f6f7'}}>
                <Content theme={login} padder style={{backgroundColor: 'transparent',marginTop:-(this.state.newHeight/3)}} scrollEnabled={true}>
                  <Button transparent style={{marginTop:theme.headerBtnMarginTop-10}} onPress={() => this.popRoute()}>
                    <Image source={require('../../../images/button/btn_back.png')}/>
                  </Button>
                  <Image source={require('../../../images/tmot_logo/ic_tmot_logo.png')} style={{alignSelf:'center',marginTop:105}} />
                  <Text style={styles.phoneLoginTitle}>電子信箱登入</Text>
                    <View padder>
                        <View style={styles.mb20}>
                            <Input placeholder="電子信箱" style={styles.generalChineseTxt} onChangeText={(email) => this.setState({email})} value={this.state.email}/>
                        </View>
                        <View style={styles.mb20}>
                            <Input secureTextEntry={true} placeholder="密碼" style={styles.generalChineseTxt} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                        </View>
                        <Button rounded style={styles.phoneBtn} disabled={this.state.btnDisabled} onPress={this.onNextPressed}>
                          {this.state.isProcessing?<Spinner color='#000'/>:<View><Text style={styles.phoneLoginTxt}>登入</Text></View>}
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

// <Spinner color='#ff6100'/>

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindAction)(LoginEmail);
