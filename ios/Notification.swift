//
//  Notification.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(Notification)
class Notification: NSObject {
  
  // MARK: SIGN UP FUNCTIONS
  
  // this function will be called in react native when push notifications are sent. Will save the sent notification into Realm
  @objc func saveNotification(notificationInfo: Dictionary<String, String>) -> Void{
    
    // create notification object
    let notification = NotificationModel()
    notification.i_notification_id = Int(notificationInfo["notification id"]! as String)!
    notification.NSDate_date       = NSDate(dateString: notificationInfo["date"]! as String)
    
    //
    switch notificationInfo["type"]! {
      
      case "announcement":
        
        let announcement = AnnoucementModel()
        announcement.i_announcement_id = Int(notificationInfo["announcement id"]! as String)!
        announcement.s_company = notificationInfo["company name"]!
        announcement.s_name = notificationInfo["name"]!
        
        notification.announcement = announcement
        
        break
      case "attendance":
        let attendance = AttendanceModel()
        attendance.i_attendance_id = Int(notificationInfo["attendance id"]! as String)!
        attendance.i_student_id    = Int(notificationInfo["student id"]! as String)!
        attendance.i_course_id     = Int(notificationInfo["course id"]! as String)!
        attendance.NSDate_date     = NSDate(dateString: notificationInfo["date"]! as String)
        attendance.b_attend        = false
        attendance.b_leave         = true
        
        notification.absentNotice  = attendance
        
        break
      case "directmessage":
        let directMessage = DirectMessageModel()
        directMessage.i_directMessage_id = Int(notificationInfo["direct message id"]! as String)!
        
        break
      case "invitation":
        let invitation = InvitationModel()
        invitation.i_invitation_id = Int(notificationInfo["invitation id"]! as String)!
        
        break
      default:
        print("no such type")
    }
    
    // save it into realm
    saveToRealm(notification)
    
  }
  
  
  // set the read/unread flag of each notification
  @objc func setNewNotificationFlag(list_notification_id: [Int], url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void{
    
    // get all invitations of the current user
    let realm   = try! Realm()
    let invitations = realm.objects(InvitationModel.self).filter("i_user_id = " + String(list_notification_id[0]))
    
    var result = [Dictionary<String, String>]()
    
    for i in 0...(invitations.count)-1{
      
      result[i]["date"]       = invitations[i].NSDate_date?.description
      result[i]["company"]    = invitations[i].s_company
      result[i]["message"]    = invitations[i].s_message
      result[i]["date"]       = invitations[i].NSDate_date?.description
      result[i]["permission"] = invitations[i].s_permission
      
      
      if invitations[i].b_isActivated{
        
        result[i]["status"]   = "activated"
      }
      else{
        
        if invitations[i].b_expired{
          
          result[i]["status"] = "expired"
        }
        else{
          
          result[i]["status"] = "pending"
        }
      }
      
      
    }
    
    successCallBack([result])
    
    
    // check if realm has invitations already, if not, then you perform the api call
    
    
    //    // return verification code in callback
    //    GetApi.getInfo(studentId, url: url,
    //
    //      // SuccessBlock (parse response to realm object)
    //      successBlock: { (response) in
    //
    //        // return true if get person info success
    //        var result = ["success" : "true"];
    //
    //        successCallBack([result])
    //      },
    //
    //      // FailureBlock (print the error message from server)
    //      failureBlock: { (response) in
    //
    //        // return false if get person info failed
    //        let result = ["success" : false];
    //
    //        failureCallBack([result])
    //    })
  }
  
  
  // private methods just for swift
  func saveToRealm(realmObject: Object){
    
    let realm = try! Realm()
    try! realm.write({
      realm.add(realmObject, update: true)
    })
  }
  
  
  // for attendance
  func getNextLocalId() -> Int{
    
    let realm = try! Realm()
    
    return realm.objects(AttendanceModel.self).count + 1
  }
  
  
}
