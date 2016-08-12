//
//  ParentModel.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Parent Model
class ParentModel: Object{
  
  dynamic var s_parent_id           : String = ""
  dynamic var s_organization_id     : String = ""
  dynamic var s_user_id             : String = ""
  dynamic var s_organization_role   : String = ""
  dynamic var s_name                : String = ""
  dynamic var s_phone               : String = ""
  dynamic var s_email               : String = ""
  dynamic var s_qr_code_id          : String = ""
  dynamic var s_profile_picture_url : String = ""
  dynamic var b_isDelete            : Bool   = false
  
  static override func primaryKey() -> String?{
    return "s_parent_id"
  }
  
  
  // parser for getting all notifications
  static func toRealmObject_list(data: Dictionary<String, AnyObject>) -> ParentModel{
      
    let parentModel = ParentModel()
    
    parentModel.s_parent_id           =     data["id"]                  as! String
    parentModel.s_organization_id     =     data["organization_id"]     as? String ?? ""
    parentModel.s_user_id             =     data["user_id"]             as? String ?? ""
    parentModel.s_organization_role   =     data["organization_role"]   as! String
    parentModel.s_name                =     data["name"]                as! String
    parentModel.s_phone               =     data["phone"]               as? String ?? ""
    parentModel.s_email               =     data["email"]               as? String ?? ""
    parentModel.s_qr_code_id          =     data["qr_code_id"]          as? String ?? ""
    parentModel.s_profile_picture_url =     data["profile_picture_url"] as! String
    
    return parentModel
  }
  
}
