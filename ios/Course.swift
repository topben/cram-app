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
        
        if response["result"]!.count > 0{
          
          let response = ((response["result"]! as! NSArray) as Array)
          // create a course model
          let course = CourseStudentModel()
          // initialize the course model with the course id
          course.s_course_id = course_id
          
          for i in 0...(response.count-1){
            let id = ((response[i] as! Dictionary<String, AnyObject>)["id"] as! String)
            // create a realm string object
            let student_id = myString()
            // set the 'string' value of the myString realm object
            student_id.string = id
            // add the student id into the course's student list
            course.students.append(student_id)
          } // end of for loop
          
          // save to realm
          self.saveToRealm(course)
          
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
    
    
  } // end of getStudentList()

  
  // get course(s) info
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    GetApi.getCourseInfo(url,
                         
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        let response = ((response["result"]! as! NSArray) as Array)

        if response.count > 0{
          
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