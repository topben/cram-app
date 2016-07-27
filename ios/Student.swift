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
  
  
  
  
  // MARK: READY FUNCTIONS
  
  
  // get student info. the studentId is the QR code scanned result
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    // return verification code in callback
    GetApi.getStudentInfo(url,
                          
                          // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        let student = StudentModel.toRealmObject(response)
        self.saveToRealm(student)
        
        // return true if get person info success
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
  
  
  // get student's class and attendance info
  @objc func getClassAndAttendanceInfo(studentId: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    //    let realm   = try! Realm()
    //    let student = realm.objects(StudentModel.self).filter("i_student_id = " + String(studentId)).first
    //
    //
    //    var courses = [Dictionary<String, String>]()
    //
    //    for i in 0...((student?.List_courses.count)! - 1){
    //
    //      courses[i]["company name"]          = student?.List_courses[i].s_company
    //      courses[i]["course name"]           = student?.List_courses[i].s_name
    //      courses[i]["course days"]           = student?.List_courses[i].s_dayOfTheWeek
    //      courses[i]["course start time"]     = student?.List_courses[i].NSDate_startTime?.description
    //      courses[i]["course end time"]       = student?.List_courses[i].NSDate_endTime?.description
    //
    //      // query student's course attend count
    //      let courseId    = (student?.List_courses.filter("s_name = " + courses[i]["course name"]!).first)?.i_course_id
    //      let attendCount = student?.List_checkInHistory.filter("i_course_id = " + String(courseId) + " AND b_attend = " + "true").count
    //      courses[i]["course attend count"]  = String(attendCount)
    //
    //      // query student's course leave count
    //      let leaveCount  = student?.List_checkInHistory.filter("i_course_id = " + String(courseId) + " AND b_leave = " + "true").count
    //      courses[i]["course leave count"]   = String(leaveCount)
    //    }
    //
    //    successCallBack(courses)
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