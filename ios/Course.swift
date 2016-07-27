//
//  Student.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/13.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(Course)
class Course: NSObject {
  
  // MARK: READY FUNCTIONS
  
  // get course info
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    GetApi.getCourseInfo(url,
                         
                         // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        // parse response into realm object
        let course = CourseModel.toRealmObject(response)
        self.saveToRealm(course)
        
        // return true if get course info success
        var result = ["success" : "true"];
        result["msg"] = (response["result"] as! String)
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