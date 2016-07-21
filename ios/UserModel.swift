//
//  People.swift
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// User Model
class UserModel: Object{
  
  dynamic var i_user_id          : Int     = 0
  dynamic var s_name             : String  = ""
  dynamic var s_username         : String  = ""
  dynamic var s_password         : String  = ""
  dynamic var s_email            : String  = ""
  dynamic var s_phone            : String  = ""
  dynamic var s_invitationCode   : String  = ""
  dynamic var s_permission       : String  = ""
  dynamic var i_scannerUsage     : Int     = 0
  dynamic var s_profileImage     : String  = ""
  dynamic var b_isTeacher        : Bool    = false
  dynamic var b_isParent         : Bool    = false
  dynamic var b_isDelete         : Bool    = false
  
  static override func primaryKey() -> String?{
    return "i_user_id"
  }
  
  // parser for single user
  static func toRealmObject(data: Dictionary<String, AnyObject>) -> UserModel{
    
    let userModel = UserModel()
    
    userModel.i_user_id                 = Int(data["id"]           as! String)!
    userModel.s_email                   = data["email"]            as! String
    userModel.s_phone                   = data["phone"]            as! String
    userModel.s_name                    = data["name"]             as! String
    userModel.s_username                = data["username"]         as! String
    userModel.s_invitationCode          = data["invitationCode"]   as! String
    userModel.s_permission              = data["permission"]       as! String
    userModel.s_profileImage            = data["profileImage"]     as! String
    
    return userModel
  }
  
  static func toDictionary(userId: Int) -> Dictionary<String, AnyObject>{
    
    let realm = try! Realm()
    let user = realm.objects(UserModel.self).filter("i_user_id = " + String(userId)).first

    var userModel = [String: AnyObject]()
   
    userModel["name"]          = user!.s_name
    userModel["password"]      = user!.s_password
    userModel["email"]         = user!.s_email
    userModel["phone"]         = user!.s_phone

    return userModel
  }
  
}