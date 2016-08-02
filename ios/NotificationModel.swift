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
  dynamic var s_check_in_method : String = ""
  dynamic var s_announcement_id : String = ""
  dynamic var s_message_id      : String = ""
  dynamic var s_invitation_id   : String = ""
  dynamic var s_attendance_id   : String = ""
  dynamic var s_status          : String = ""
  dynamic var s_type            : String = ""
  dynamic var b_isDelete        : Bool   = false
  
  static override func primaryKey() -> String?{
    return "s_notification_id"
  }
  
  
  // parser for getting all notifications
  static func toRealmObject_list(data: Dictionary<String, AnyObject>) -> NotificationModel{
    
    let notificationModel = NotificationModel()
    
    notificationModel.s_notification_id =     data["id"]               as! String
    notificationModel.s_announcement_id =     data["announcement_id"]  as? String ?? ""
    notificationModel.s_attendance_id   =     data["attendance_id"]    as? String ?? ""
    notificationModel.s_message_id      =     data["message_id"]       as? String ?? ""
    notificationModel.s_invitation_id   =     data["invitation_id"]    as? String ?? ""
    notificationModel.i_created_at      =     data["created_at"]       as! Int
    
    return notificationModel
    
  }
  
  
  // parser for getting all notifications
  static func toRealmObject_list_new(data: Dictionary<String, AnyObject>) -> NotificationModel{
    
    let notificationModel = NotificationModel()
    
    notificationModel.s_notification_id =     data["id"]         as! String
    notificationModel.s_type            =     data["type"]       as! String
    notificationModel.i_created_at      = Int(data["created_at"] as! String)!
    
    switch notificationModel.s_type {
      
      case "student_late":
        let result = data["objects"]!["attendance"]!
        notificationModel.s_course_id       = result!["course_id"]       as! String
        notificationModel.s_student_id      = result!["student_id"]      as! String
        notificationModel.s_teacher_id      = result!["teacher_id"]      as? String ?? ""
        notificationModel.s_check_in_method = result!["check_in_method"] as! String
        notificationModel.s_status          = result!["status"]          as! String
        break
      
      default:
        print("notification type not implemented")
      
    } // end of switch
    
    
    return notificationModel
    
  }
  
  
}