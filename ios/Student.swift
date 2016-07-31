//
//  Student.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/13.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(Student)
class Student: NSObject {
  
  // MARK: READY FUNCTIONS
  
  // get student(s) info. the studentId is the QR code scanned result
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    // return verification code in callback
    GetApi.getStudentInfo(url,
                          
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response.count > 0{
        
          let response = ((response["result"]! as! NSArray) as Array)
          
          for i in 0...(response.count-1){
            let studentModel = StudentModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(studentModel)
          }
        
        }
        // return true if get person info success
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
  
  // for attendance
  func getNextLocalId() -> Int{
    
    let realm = try! Realm()
    
    return realm.objects(AttendanceModel.self).count + 1
  }
  
  
  
}