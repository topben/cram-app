//
//  NotificationModel.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Notification Model
class NotificationModel: Object{
  
  dynamic var s_notification_id : String = ""
  dynamic var b_isRead          : Bool   = false
  dynamic var i_created_at      : Int    = 0
  dynamic var s_course_id       : String = ""
  dynamic var s_teacher_id      : String = ""
  dynamic var s_student_id      : String = ""
  dynamic var check_in_method   : String = ""
  dynamic var s_status          : String = ""
  dynamic var b_isDelete        : Bool   = false
  
  static override func primaryKey() -> String?{
    return "s_notification_id"
  }
  
  
  // parser for getting notification
  static func toRealmObject_getNotifications(data: Dictionary<String, AnyObject>) -> NotificationModel{
    
    let result = data["result"]!
    
    let notificationModel = NotificationModel()
    
    notificationModel.s_notification_id                 = result["id"]                    as! String
    notificationModel.s_course_id                       = result["course_id"]             as! String
    notificationModel.s_teacher_id                      = result["teacher_id"]            as? String ?? ""
    notificationModel.s_student_id                      = result["student_id"]            as! String
    notificationModel.check_in_method                   = result["check_in_method"]       as! String
    notificationModel.s_status                          = result["status"]                as! String
    //    notificationModel.s_status                    = result["created_at"]             as! String
    
    return notificationModel
  }
  
  
}