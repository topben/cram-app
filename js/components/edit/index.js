/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {replaceOrPushRoute} from '../../actions/route';
// import CodePush from 'react-native-code-push';
import { DeviceEventEmitter, Dimensions, Image, Keyboard} from 'react-native';
import {popRoute} from '../../actions/route';
import {Container, Header, Title, Content, Card, Thumbnail, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import edit from './edit-theme';

class Edit extends Component {

  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.state = {
          username: '',
          email: ''
      };
  }

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    onNextPressed(){
      console.log(this.state.username);
      this.navigateTo('login');
    }


    render() {
        return (
          <View style={{flex:1,backgroundColor:'#f5f6f7'}}>
            <Button transparent style={{marginTop:theme.headerBtnMarginTop}} onPress={() => this.popRoute()}>
              <Image source={require('../../../images/button/btn_back.png')}/>
            </Button>
            <Content
              theme={edit}
              style={{backgroundColor: '#f5f6f7'}}
              >
              <Image source={require('../../../images/profile/ic_profile_photo_md.png')} style={{alignSelf:'center',marginTop:105}} />
              <Text style={styles.mainTitle}>設定新帳號</Text>
              <View style={styles.bg}>
                <View style={styles.mb20}>
                    <Input placeholder="電子信箱" onChangeText={(code) => this.setState({code})} value={this.state.code} />
                    <Text>{this.state.client_error_msg}</Text>
                  </View>
                  <Button transparent rounded style={styles.finishBtn} onPress={this.onNextPressed}>
                    <Text style={styles.emailTxt}>完成</Text>
                  </Button>
              </View>
            </Content>
          </View>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(Edit);
