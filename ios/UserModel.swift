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
  dynamic var i_login_at         : Int     = 0
  dynamic var i_scannerUsage     : Int     = 0
  dynamic var i_created_at       : Int     = 0
  dynamic var i_updated_at       : Int     = 0
  dynamic var i_deleted_at       : Int     = 0
  
  dynamic var s_profile_picture_file_name  : String = ""
  dynamic var i_profile_picture_updated_at : Int = 0
  
  static override func primaryKey() -> String?{
    return "s_user_id"
  }
  
  // MARK: RESPONSE PARSERS
  
  // parser for user creation
  static func toRealmObject_create(data: Dictionary<String, AnyObject>) -> UserModel{
  
    let result = data["result"]!
    
    let userModel = UserModel()
    
    userModel.s_user_id                   = result["id"]                  as? String ?? ""
    userModel.s_email                     = result["email"]               as? String ?? ""
    userModel.s_phone                     = result["phone"]               as? String ?? ""
    userModel.s_role                      = result["role"]                as? String ?? ""
    userModel.s_profile_picture_file_name = result["profile_picture_url"] as? String ?? ""
    
    return userModel
  }
  
  // parser for login response
  static func toRealmObject_login(data: Dictionary<String, AnyObject>) -> UserModel{
    
    let result = data
    let userModel = UserModel()
    
    userModel.s_user_id                   = result["resource_owner_id"]              as? String ?? ""
    userModel.s_access_token              = result["access_token"]                   as? String ?? ""
    userModel.s_token_type                = result["token_type"]                     as? String ?? ""
    userModel.s_refresh_token             = result["refresh_token"]                  as? String ?? ""
    userModel.i_created_at                = result["created_at"]                     as? Int    ?? 0
    userModel.i_login_at                  = Int(NSDate().timeIntervalSince1970)
    
    return userModel
  }

  // parser for getting user info
  static func toRealmObject_me(data: Dictionary<String, AnyObject>){
    
    let realm = try! Realm()
    let userModel = realm.objects(UserModel.self).filter("s_user_id = '" + String(data["id"]!) + "'").first!
    
    try! realm.write({
      
      userModel.s_email                     = data["email"]               as? String ?? ""
      userModel.s_phone                     = data["phone"]               as? String ?? ""
      userModel.s_role                      = data["role"]                as? String ?? ""
      userModel.s_profile_picture_file_name = data["profile_picture_url"] as? String ?? ""
    })
    
  }

  
}