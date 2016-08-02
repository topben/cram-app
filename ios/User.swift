//
//  MySwiftThingy.swift
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(User)
class User: NSObject {
  
  // MARK: SIGN UP FUNCTIONS
  
  // get user's verification code
  @objc func sendVerificationCode(phone: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
  
    // return verification code in SMS
    PostApi.sendVerificationCode(phone, url: url,
                       
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        // return true if get person info success
        var result = ["success" : "true"];
        result["msg"] = (response["result"] as! String)
        
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        var result = ["success" : "false"];
        result["msg"] = (response["error"] as! String)
        
        failureCallBack([result])
    })

    
  }
  
  // check user's verification code
  @objc func checkVerificationCode(verificationCode: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    // return result in callback
    GetApi.checkVerificationCode(verificationCode, url: url,
                               
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        // return true if get person info success
        var result = ["success" : "true"];
        result["msg"] = (response["result"] as! String)
        
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        var result = ["success" : "false"];
        result["msg"] = (response["error"] as! String)
        
        failureCallBack([result])
    })

  }
  
  // check username if valid
  @objc func checkUsername(username: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    // return result in callback
    GetApi.checkUsername(username, url: url,
                                  
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        // return true if get person info success
        var result = ["success" : "true"];
        result["msg"] = (response["result"] as! String)
        
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        var result = ["success" : "false"];
        result["msg"] = (response["error"] as! String)
        
        failureCallBack([result])
    })

  } // end of checkUsername()
  
  
  // create user
  @objc func create(userInfo: Dictionary<String, AnyObject>, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {

    PostApi.createUser(userInfo, url: url,
                         
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        let userModel = UserModel.toRealmObject_create(response)
        self.saveToRealm(userModel)
        
        // return true if get person info success
        let result = ["success" : "true"];
        
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        var result = ["success" : "false"];
        result["msg"] = (response["error"] as! String)
        
        failureCallBack([result])
    })
    
  } // end of create()
  
  
  // MARK: LOGIN FUNCTIONS
  
  // user login
  @objc func login(username: String, password: String, grantType: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    PostApi.login(username, password: password, grantType: grantType, url: url,
                       
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        let userModel = UserModel.toRealmObject_login(response)
        self.saveToRealm(userModel)
        
        // return true if get person info success
        let result = ["success" : "true"];
        
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        var result = ["success" : "false"];
        result["msg"] = (response["error"] as! String)
        
        failureCallBack([result])
    })
    
  } // end of getInfo()
  
  
  // get info
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    GetApi.getUserInfo(url,
                       
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response.count > 0{
        
          let response = response["result"]! as! Dictionary<String, AnyObject>
          
          UserModel.toRealmObject_me(response)
        }
        // return true if get person info success
        let result = ["success" : "true"];
        
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        var result = ["success" : "false"];
        result["msg"] = (response["error"] as! String)
        
        failureCallBack([result])
    })
    
  } // end of getInfo()
  
    
  
  // MARK: NOT READY
  
  
  
  // activate invitation code
  @objc func activateInvitationCode(invitationCode: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {

    
  }
  
  // get user permission
  @objc func getPermission(invitationCode: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    // save user permissions in realm, and return result in callback
    GetApi.getUserPermission(invitationCode, url: url,
                                  
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        // return true if get person info success
        let result = ["success" : true];
        
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        let result = ["success" : false];
        
        failureCallBack([result])
    })

  }
  
  
  // create user in realm
  @objc func createInRealm(user_id: String, email: String, phone: String, password: String) -> Void{
    
    let userModel = UserModel()
    userModel.s_user_id = user_id
    userModel.s_email = email
    userModel.s_phone = phone
    userModel.s_password = password
    
    saveToRealm(userModel)
    
  } // end of createInRealm()
  
  
  // update user in realm
  @objc func updateInRealm(user_id: Int, name: String?, email: String?) -> Void{
    
    let realm = try! Realm()
    let userModel = realm.objects(UserModel.self).filter("i_user_id = " + String(user_id)).first
    
    // if there is new data, use it, or else, use the old data
    
    if userModel != nil{
      
      try! realm.write{
        
        userModel!.s_name       = name  ?? userModel!.s_name
        userModel!.s_email      = email ?? userModel!.s_email
      }
      saveToRealm(userModel!)
      
    }
    
  } // end of updateInRealm()
  
  
  
  // update user info in server
  @objc func updateInServer(user_id: Int, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
//    PutApi.updateUser(user_id, url: url,
//                        
//      // SuccessBlock (parse response to realm object)
//      successBlock: { (response) in
//        
//        // return true if get person info success
//        let result = ["success" : "true"];
//        
//        successCallBack([result])
//      },
//      
//      // FailureBlock (print the error message from server)
//      failureBlock: { (response) in
//        
//        // return false if get person info failed
//        let result = ["success" : "false"];
//        
//        failureCallBack([result])
//    })
    
  } // end of updateInServer()

  
  // private methods just for swift
  func saveToRealm(realmObject: Object){
    
    let realm = try! Realm()
    try! realm.write({
      realm.add(realmObject, update: true)
    })
  }
  
  func getNextLocalId() -> Int{
    
    let realm = try! Realm()
    
    return realm.objects(UserModel.self).count + 1
  }
  
  
}