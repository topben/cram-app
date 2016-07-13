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
  dynamic var data_profileImage  : NSData? = "".dataUsingEncoding(NSUTF8StringEncoding)
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
    userModel.s_password                = data["password"]         as! String
    userModel.s_invitationCode          = data["invitationCode"]   as! String
    userModel.s_permission              = data["permission"]       as! String
    userModel.data_profileImage         = (data["profileImage"]    as! String).dataUsingEncoding(NSUTF8StringEncoding)
    
    return userModel
  }
  
  static func toDictionary(userId: Int) -> Dictionary<String, AnyObject>{
    
    let realm = try! Realm()
    let user = realm.objects(UserModel.self).filter("i_user_id = " + String(userId)).first

    var userModel = [String: AnyObject]()
    
    userModel["id"]            = user!.i_user_id
    userModel["name"]          = user!.s_name
    userModel["username"]      = user!.s_username
    userModel["password"]      = user!.s_password
    userModel["email"]         = user!.s_email
    userModel["phone"]         = user!.s_phone
    userModel["inviationCode"] = user!.s_invitationCode
    userModel["permission"]    = user!.s_permission
    userModel["profileImage"]  = user!.data_profileImage

    return userModel
  }
  
}