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
  
  
  // get list of students in a specific course
  @objc func getStudentList(course_id: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    GetApi.getStudentList(url + "&course_id=" + course_id,
                         
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response["reuslt"]!.count > 0{
          
          let response = ((response["result"]! as! NSArray) as Array)
          let realm = try! Realm()
          let courseModel = realm.objects(CourseModel.self).filter("s_course_id = '" + course_id + "'").first!
          
          for i in 0...(response.count-1){
            
            let studentModel = StudentModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            courseModel.students.append(studentModel)
            self.saveToRealm(courseModel)
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
    
    
  } // end of getStudentList()

  
  // get course(s) info
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    GetApi.getCourseInfo(url,
                         
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response.count > 0{
        
          let response = ((response["result"]! as! NSArray) as Array)
          
          for i in 0...(response.count-1){
            let courseModel = CourseModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(courseModel)
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