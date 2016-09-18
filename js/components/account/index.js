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
import { Image } from 'react-native';
import {popRoute} from '../../actions/route';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Container, Header, Title, Content, Card, List, ListItem, Thumbnail, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import account from './account-theme';
import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';
const {User} = require('NativeModules');

class Account extends Component {
  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.state = {
          phone: '',
          email: '',
          scan_count: ''
      };
  }

    componentWillMount () {
      let realm = new Realm({schema: realm_schema});
      // console.log(Realm.defaultPath);
      // get user access token
      var users = realm.objects('UserModel').sorted('i_login_at', true);
      var currentUser = users[users.length-1];
      this.setState({phone:currentUser.s_phone});
      this.setState({email:currentUser.s_email});
      this.setState({scan_count:currentUser.i_scannerUsage});
      //console.warn(currentUser.s_phone);
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
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button transparent style={{marginTop:theme.headerBtnMarginTop}} onPress={() => this.navigateTo('scanner')}>
              <Image source={require('../../../images/button/btn_back.png')}/>
            </Button>
            <Text></Text>
            </View>
            <Content
              theme={account}
              style={{backgroundColor: '#f5f6f7'}}
              scrollEnabled={this.state.scroll}>
              <View>
                <Text style={styles.topTitle}>帳號</Text>
              </View>
              <Image source={require('../../../images/profile/ic_profile_photo_md.png')} style={{alignSelf:'center',marginTop:30}} />
              <View style={{marginLeft:20,marginBottom:10,paddingTop:40}}><Text style={styles.subGrayTxt}>帳號資料</Text></View>
              <Grid style={styles.bg}>
                <Row style={styles.row}><Text style={styles.subGrayTxt}>手機號碼</Text><Text style={styles.subBlackTxt}>{this.state.phone}</Text></Row>
                <Row style={styles.row}><Text style={styles.subGrayTxt}>電子信箱</Text><Text style={styles.subBlackTxt}>{this.state.email}</Text></Row>
                <Row style={styles.row}><Text style={styles.subGrayTxt}>QR Code 掃描次數</Text><Text style={styles.subBlackTxt}>{this.state.scan_count}</Text></Row>
              </Grid>
              <View style={{paddingTop:100}}>
              <Button  block onPress={() => this.navigateTo('login')} style={{borderWidth:1,borderColor:'#808080',backgroundColor:'#fff',height:50}}>
                <View>
                  <Text style={styles.logOutText}>登出</Text>
                </View>
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

export default connect(null, bindAction)(Account);
