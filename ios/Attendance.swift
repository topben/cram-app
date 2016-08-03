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
    
    GetApi.getAttendanceInfo(url,
                         
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response.count > 0{
          
          let response = ((response["result"]! as! NSArray) as Array)
          
          for i in 0...(response.count-1){
            print("inserting attendance model " + String(i))
            let attendanceModel = AttendanceModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(attendanceModel)
          }
          
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
  
  // MARK: NOT READY FUNCTIONS
  
  // private methods just for swift
  func saveToRealm(realmObject: Object){
    
    let realm = try! Realm()
    try! realm.write({
      realm.add(realmObject, update: true)
    })
  }
  
  
  
  
}