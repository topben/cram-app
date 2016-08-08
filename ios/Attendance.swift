//
//  Attendance.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(Attendance)
class Attendance: NSObject {
  
  // MARK: READY FUNCTIONS
  
  // get attendance(s) info
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    var last_updated_at = 0
    let realm = try! Realm()
    
    if realm.objects(SynchronizationModel).count > 1{
      last_updated_at = realm.objects(SynchronizationModel).filter("i_table_id = 1").first!.i_last_updated_at
    }
    
    let updated_at = NSDate(timeIntervalSince1970: Double(last_updated_at)).toFormattedString()
    
    GetApi.getAttendanceInfo(url + "&updated_at=" + updated_at,
                         
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response["result"]?.count > 0{
          
          let response = ((response["result"]! as! NSArray) as Array)
          
          for i in 0...(response.count-1){
            
            let attendanceModel = AttendanceModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(attendanceModel)
          } // end of for loop
          
          let synchModel = SynchronizationModel()
          synchModel.i_table_id        = 0
          synchModel.s_table_name      = "attendance table"
          synchModel.i_last_updated_at = Int(NSDate().timeIntervalSince1970)
          self.saveToRealm(synchModel)
        } // end of if()
        
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
  
  // MARK: NOT READY FUNCTIONS
  
  // private methods just for swift
  func saveToRealm(realmObject: Object){
    
      let realm = try! Realm()
      
      try! realm.write({
        realm.add(realmObject, update: true)
      })
  }
}
