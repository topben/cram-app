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
  
  dynamic var s_user_id          : String  = ""
  dynamic var s_name             : String  = ""
  dynamic var s_password         : String  = ""
  dynamic var s_email            : String  = ""
  dynamic var s_phone            : String  = ""
  dynamic var s_country          : String  = ""
  dynamic var s_profileImage     : String  = ""
  dynamic var s_invitationCode   : String  = ""
  dynamic var s_role             : String  = ""
  dynamic var s_access_token     : String  = ""
  dynamic var s_refresh_token    : String  = ""
  dynamic var s_token_type       : String  = ""
  dynamic var i_updateTimestamp  : Int     = 0
  dynamic var i_scannerUsage     : Int     = 0
  dynamic var i_created_at       : Int     = 0
  dynamic var i_updated_at       : Int     = 0
  dynamic var i_deleted_at       : Int     = 0
  
  dynamic var s_profile_picture_file_name  : String = ""
  dynamic var i_profile_picture_updated_at : Int = 0
  
  static override func primaryKey() -> String?{
    return "s_user_id"
  }
  
  // parser for user creation
  static func toRealmObject_create(data: Dictionary<String, AnyObject>) -> UserModel{
  
    let result = data["result"]!
    
    let userModel = UserModel()
    
    userModel.s_user_id                 = result["id"]               as! String
    userModel.s_email                   = result["email"]            as! String
    userModel.s_phone                   = result["phone"]            as! String
    userModel.s_role                    = result["role"]             as! String
//    userModel.i_updateTimestamp         = Int(result["updated_at"]   as! String)!
    
    return userModel
  }

  // parser for getting user info
  static func toRealmObject_getInfo(data: Dictionary<String, AnyObject>) -> UserModel{
  
    let result = data["result"]!
    
    let userModel = UserModel()
    
    userModel.s_user_id                       = result["id"]                             as! String
    userModel.s_email                         = result["email"]                          as! String
//    userModel.i_created_at                    = result["created_at"]                     as! Int
//    userModel.i_updated_at                    = result["updated_at"]                     as! Int
    userModel.i_deleted_at                    = result["deleted_at"]                     as? Int    ?? 0
    userModel.s_phone                         = result["phone"]                          as! String
    userModel.s_role                          = result["role"]                           as! String
    userModel.s_country                       = result["country"]                        as? String ?? ""
    userModel.s_name                          = result["name"]                           as? String ?? ""
    userModel.s_profile_picture_file_name     = result["profile_picture_file_name"]      as? String ?? ""
    userModel.i_profile_picture_updated_at    = result["profile_picture_updated_at"]     as? Int    ?? 0
    
    return userModel
  }

  // parser for login response
  static func toRealmObject_login(data: Dictionary<String, AnyObject>) -> UserModel{
    
//    let result = data["result"]!
    let result = data
    
    let userModel = UserModel()
    
    userModel.s_access_token                  = result["access_token"]                   as! String
    userModel.s_token_type                    = result["token_type"]                     as! String
    userModel.s_refresh_token                 = result["refresh_token"]                  as! String
    userModel.i_created_at                    = result["created_at"]                     as! Int
    
    return userModel
  }


  static func toDictionary(userId: String) -> Dictionary<String, AnyObject>{
    
    let realm = try! Realm()
    let user = realm.objects(UserModel.self).filter("i_user_id = " + userId).first

    var userModel = [String: AnyObject]()
   
//    userModel["name"]          = user!.s_name
//    userModel["password"]      = user!.s_password
//    userModel["email"]         = user!.s_email
//    userModel["phone"]         = user!.s_phone

    return userModel
  }
  
}