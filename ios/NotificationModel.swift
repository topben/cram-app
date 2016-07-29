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
  static func toRealmObject_getNotificationIDs(data: Dictionary<String, AnyObject>) -> [String]{
    
    let result = (data["result"]! as! NSArray) as Array
    
    var IDs = [String]()
    
    for i in 0...(result.count-1){
      IDs.append(result[i]["id"] as! String)
    }
    
    return IDs
  }
  
  
}