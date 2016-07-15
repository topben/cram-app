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
  
  dynamic var i_notification_id : Int    = 0
  dynamic var b_isRead          : Bool   = false
  dynamic var NSDate_date       : NSDate?
  dynamic var announcement      : AnnoucementModel?
  dynamic var absentNotice      : AttendanceModel?
  dynamic var directMessage     : DirectMessageModel?
  dynamic var invitation        : InvitationModel?
  dynamic var b_isDelete        : Bool   = false
  
  static override func primaryKey() -> String?{
    return "i_notification_id"
  }
  
}