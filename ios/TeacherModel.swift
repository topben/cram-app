//
//  NotificationModel.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Teacher Model
class TeacherModel: Object{
  
  dynamic var s_teacher_id          : String = ""
  dynamic var s_organization_id     : String = ""
  dynamic var s_organization_role   : String = ""
  dynamic var s_name                : String = ""
  dynamic var s_phone               : String = ""
  dynamic var s_email               : String = ""
  dynamic var s_qr_code_id          : String = ""
  dynamic var s_profile_picture_url : String = ""
  dynamic var s_parent_id           : String = ""
  dynamic var b_isDelete            : Bool   = false
  
  static override func primaryKey() -> String?{
    return "s_teacher_id"
  }
  
  
  // parser for getting all notifications
  static func toRealmObject_list(data: Dictionary<String, AnyObject>) -> TeacherModel{
    
    let teacherModel = TeacherModel()
    
    teacherModel.s_teacher_id          =     data["id"]                  as! String
    teacherModel.s_organization_id     =     data["organization_id"]     as? String ?? ""
    teacherModel.s_organization_role   =     data["organization_role"]   as? String ?? ""
    teacherModel.s_name                =     data["name"]                as! String
    teacherModel.s_phone               =     data["phone"]               as? String ?? ""
    teacherModel.s_email               =     data["email"]               as? String ?? ""
    teacherModel.s_qr_code_id          =     data["qr_code_id"]          as? String ?? ""
    teacherModel.s_profile_picture_url =     data["profile_picture_url"] as? String ?? ""
    teacherModel.s_parent_id           =     data["parent_id"]           as? String ?? ""
    
    return teacherModel
  }
  
}