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
  
  // MARK: READY FUNCTIONS
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void{
  
    let realm = try! Realm()
    let last_updated_at = realm.objects(SynchronizationModel).filter("i_table_id = '1'").first!.i_last_updated_at
    let updated_at = NSDate(timeIntervalSince1970: Double(last_updated_at)).toFormattedString()
    
    GetApi.getNotifications(url + "&updated_at=" + updated_at,
                                 
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response.count > 0{
        
          let response = ((response["result"]! as! NSArray) as Array)
        
          for i in 0...(response.count-1){
            let notificationModel = NotificationModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(notificationModel)
          }
          
          let synchModel = SynchronizationModel()
          synchModel.i_table_id        = 1
          synchModel.s_table_name      = "notification table"
          synchModel.i_last_updated_at = Int(NSDate().timeIntervalSince1970)
          self.saveToRealm(synchModel)
        }
        // return true if get course info success
        let result = ["success" : "true"];
        
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        var result = ["success" : "false"];
        result["msg"] = (response["error"] as! String)
        
        failureCallBack([result])
    })

  
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
