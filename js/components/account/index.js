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

class Account extends Component {
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
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Button transparent style={{marginTop:theme.headerBtnMarginTop}} onPress={() => this.popRoute()}>
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
              <View style={{marginLeft:20,marginBottom:10}}><Text style={styles.subGrayTxt}>帳號資料</Text></View>
              <Grid style={styles.bg}>
                <Row style={styles.row}><Text style={styles.subGrayTxt}>手機號碼</Text><Text style={styles.subBlackTxt}>+886 912345678</Text></Row>
                <Row style={styles.row}><Text style={styles.subGrayTxt}>電子信箱</Text><Text style={styles.subBlackTxt}>+ merrycheng@gmail.com</Text></Row>
                <Row style={styles.row}><Text style={styles.subGrayTxt}>QR Code 掃描次數</Text><Text style={styles.subOrangeTxt}>70次</Text></Row>
              </Grid>
              <View style={{paddingTop:100}}>
              <ListItem button onPress={() => this.navigateTo('login')} style={{borderWidth:0.5,borderColor:'#808080',backgroundColor:'#fff',height:50}}>
                  <Text style={styles.logOutText}>回首頁</Text>
              </ListItem>
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
