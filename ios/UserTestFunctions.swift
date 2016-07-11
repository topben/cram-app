//
//  UserTestFunctions.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

class UserTestFunctions{
  
  static func createVerificationCodeWithPhoneNumber(phone: String) -> String{
    
    let testUser = TestUser()
    testUser.s_phone = phone
    testUser.s_verificationCode = "abc123"
    saveToRealm(testUser)
    
    return testUser.s_verificationCode
  }
  
  static func checkVerificationCodeWithPhoneNumber(phone: String, verificationCode: String) -> Bool{
    
    let realm = try! Realm()
    let test_user = realm.objects(TestUser.self).filter("s_phone = " + "'" + String(phone) + "'").first
        
    if verificationCode  == test_user!.s_verificationCode{
      return true
    }
    else{
      return false
    }
  }
  
  static func checkUsername(username: String) -> Bool{
    
    let realm = try! Realm()
    let test_user = realm.objects(TestUser.self).filter("s_username = " + String(username)).first
    
    
    if test_user == nil{
      return true
    }
    else{
      return false
    }
    
  }
  
  static func createUser(userInfo: Dictionary<String, AnyObject>){
    
    let testUser = TestUser()
    testUser.i_user_id = getNextLocalId()
    testUser.s_email = userInfo["email"] as! String
    testUser.s_phone = userInfo["phone"] as! String
    testUser.s_name  = userInfo["name"]  as! String
    testUser.s_username = userInfo["username"] as! String
    testUser.s_password = userInfo["password"] as! String
    saveToRealm(testUser)
  }
  
  
  
  // private methods just for swift
  static func saveToRealm(realmObject: Object){
    
    let realm = try! Realm()
    try! realm.write({
      realm.add(realmObject, update: true)
    })
  }
  
  static func getNextLocalId() -> Int{
    
    let realm = try! Realm()
    
    return realm.objects(UserModel.self).count + 1
  }


  
}

class TestUser: Object{
  
  dynamic var i_user_id          : Int     = 0
  dynamic var s_name             : String  = ""
  dynamic var s_username         : String  = ""
  dynamic var s_password         : String  = ""
  dynamic var s_email            : String  = ""
  dynamic var s_phone            : String  = ""
  dynamic var s_invitationCode   : String  = ""
  dynamic var s_verificationCode : String  = ""
  dynamic var b_isDelete         : Bool    = false
  
  static override func primaryKey() -> String?{
    return "i_user_id"
  }
  
}
