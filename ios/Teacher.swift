//
//  Student.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/13.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(Teacher)
class Teacher: NSObject {
  
  // MARK: READY FUNCTIONS
  
  // check student in
  @objc func checkIn(qrCode_id: String, checkIn_method: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    // return verification code in callback
    PostApi.checkIn(qrCode_id, checkIn_method: checkIn_method, url: url,
                    
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response["result"]?.count > 0{
          
          let response = ((response["result"]! as! NSArray) as Array)
        
          for i in 0...(response.count-1){
            
            let attendanceModel = AttendanceModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(attendanceModel)
          } // end of for loop
        } // end of if statement
        
        let realm = try! Realm()
        let count = realm.objects(AttendanceModel.self).count.description
//        print("swift count = " + realm.objects(AttendanceModel.self).count.description)
        // return total count
        let result = ["count" : count];
        
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
  
  // for attendance
  func getNextLocalId() -> Int{
    
    let realm = try! Realm()
    
    return realm.objects(AttendanceModel.self).count + 1
  }
  
  
  
}