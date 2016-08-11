//
//  Student.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/13.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(Parent)
class Parent: NSObject {
  
  // MARK: READY FUNCTIONS
  
  // get full list of parents
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    
    GetApi.getOrganizationInfo(url,
                               
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response["result"]?.count > 0{
          
          let response = ((response["result"]! as! NSArray) as Array)
          
          for i in 0...(response.count-1){
            
            let parentModel = ParentModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(parentModel)
          } // end of for loop
        } // end of if statement
        
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
    
    
  } // end of getInfo()
  
  
  // 請假
  @objc func takeDayOff(student_id: String, klass_id: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    
    PostApi.takeDayOff(student_id, klass_id: klass_id, url: url,
                               
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response["result"]?.count > 0{
          
          let response = ((response["result"]! as! NSArray) as Array)
          
          for i in 0...(response.count-1){
            
            let attendanceModel = AttendanceModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(attendanceModel)
          } // end of for loop
        } // end of if statement
        
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
    
    
  } // end of takeDayOff()
  
  
  
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