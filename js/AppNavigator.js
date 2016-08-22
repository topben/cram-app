/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash/core';
import {Drawer} from 'native-base';
import {BackAndroid, Platform, StatusBar} from 'react-native';
import {closeDrawer} from './actions/drawer';
import {popRoute} from './actions/route';
import Navigator from 'Navigator';

import Account from './components/account/';
import Login from './components/login/';
import LoginEmail from './components/login/login-email';
import LoginAccount from './components/login/login-account';
import Scanner from './components/scanner/';
import ScannerOverlay from './components/scanner/scanner-overlay';
import Notifications from './components/notifications/';
import Comments from './components/notifications/comments';
import SplashPage from './components/splashscreen/';
import Home from './components/home/';
import SignUp from './components/sign-up/';
import SignUpVerify from './components/sign-up/sign-up-verify';
import SignUpCreate from './components/sign-up/sign-up-create';
import Edit from './components/edit/';
import Inbox from './components/inbox/';
import Invitation from './components/invitation/';
import Mail from './components/mail/';
import Compose from './components/compose/';
import Lists from './components/lists/';
import Icons from './components/icons/';
import ProgressBar from './components/progressbar/';
import Spinner from './components/spinner/';
import Contacts from './components/contact/';
import Calendar from './components/calendar/';
import CalendarClassInfo from './components/calendar/class-info';
import Form from './components/form/';
import Modal from './components/modal/';
import Chat from './components/chat/';
import SideBar from './components/sideBar';
import { statusBarColor } from "./themes/base-theme";

Navigator.prototype.replaceWithAnimation = function (route) {
  const activeLength = this.state.presentedIndex + 1;
  const activeStack = this.state.routeStack.slice(0, activeLength);
  const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
  const nextStack = activeStack.concat([route]);
  const destIndex = nextStack.length - 1;
  const nextSceneConfig = this.props.configureScene(route, nextStack);
  const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

  const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
  this._emitWillFocus(nextStack[destIndex]);
  this.setState({
    routeStack: nextStack,
    sceneConfigStack: nextAnimationConfigStack,
  }, () => {
    this._enableScene(destIndex);
    this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
      this.immediatelyResetRouteStack(replacedStack);
    });
  });
};

export var globalNav = {};

const searchResultRegexp = /^search\/(.*)$/;

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        // console.log("ACTION:", action);
        var currentState = state;

        if(currentState){
          while (currentState.children){
            currentState = currentState.children[currentState.index]
          }
        }

        return defaultReducer(state, action);
    }
};

const drawerStyle  = { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3};
class AppNavigator extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        globalNav.navigator = this._navigator;
        // console.log(global.globalNav, "global nav");

        this.props.store.subscribe(() => {
            // console.log("store changed", this.props.store.getState());
            if(this.props.store.getState().drawer.drawerState == 'opened')
                this.openDrawer();

            if(this.props.store.getState().drawer.drawerState == 'closed')
                this._drawer.close();
        });

        BackAndroid.addEventListener('hardwareBackPress', () => {
            var routes = this._navigator.getCurrentRoutes();

            if(routes[routes.length - 1].id == 'home' || routes[routes.length - 1].id == 'login') {
                // CLose the app
                return false;
            }
            else {
                this.popRoute();
                return true;
            }

        });
    }

    popRoute() {
        this.props.popRoute();
    }

    openDrawer() {
        this._drawer.open();
    }

    closeDrawer() {
        if(this.props.store.getState().drawer.drawerState == 'opened') {
            this._drawer.close();
            this.props.closeDrawer();
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<SideBar navigator={this._navigator} />}
                tapToClose={true}
                acceptPan={false}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}>
                <StatusBar
                    backgroundColor={statusBarColor}
                    barStyle="default"
                />
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => {
                        return {
                            ...Navigator.SceneConfigs.FloatFromRight,
                            gestures: {}
                        };
                    }}
                    initialRoute={{id: (Platform.OS === "android") ? 'splashscreen' : 'login', statusBarHidden: true}}
                    renderScene={this.renderScene}
                  />
            </Drawer>
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'account':
                return <Account navigator={navigator} />;
            case 'splashscreen':
                return <SplashPage navigator={navigator} />;
            case 'login':
                return <Login navigator={navigator} />;
            case 'loginEmail':
                return <LoginEmail navigator={navigator} />;
            case 'loginAccount':
                return <LoginAccount navigator={navigator} />;
            case 'scanner':
                return <Scanner navigator={navigator} />;
            case 'scannerOverlay':
                return <ScannerOverlay navigator={navigator} />;
            case 'notifications':
                return <Notifications navigator={navigator} />;
            case 'comments':
                return <Comments navigator={navigator} />;
            case 'home':
                return <Home navigator={navigator} />;
            case 'inbox':
                return <Inbox navigator={navigator} />;
            case 'compose':
                return <Compose navigator={navigator} />;
            case 'signUp':
                return <SignUp navigator={navigator} />;
            case 'signUpVerify':
                return <SignUpVerify navigator={navigator} />;
            case 'signUpCreate':
                return <SignUpCreate navigator={navigator} />;
            case 'edit':
                return <Edit navigator={navigator} />;
            case 'mail':
                return <Mail navigator={navigator} />;
            case 'lists':
                return <Lists navigator={navigator} />;
            case 'icons':
                return <Icons navigator={navigator} />;
            case 'invitation':
                return <Invitation navigator={navigator} />;
            case 'progressBar':
                return <ProgressBar navigator={navigator} />;
            case 'spinners':
                return <Spinner navigator={navigator} />;
            case 'contacts':
                return <Contacts navigator={navigator} />;
            case 'calendar':
                return <Calendar navigator={navigator} />;
            case 'calendarClassInfo':
                console.warn(route.test);
                return <CalendarClassInfo navigator={navigator} test={route.test}/>;
            case 'form':
                return <Form navigator={navigator} />;
            case 'modal':
                return <Modal navigator={navigator} />;
            case 'chat':
                return <Chat navigator={navigator} />;
            default :
                return <Login navigator={navigator}  />;
        }
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

const mapStateToProps = (state) => {
  return {
    drawerState: state.drawer.drawerState
  }
}

export default connect(mapStateToProps, bindAction) (AppNavigator);
