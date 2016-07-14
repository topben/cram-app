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
  
  // MARK: SIGN UP FUNCTIONS
  
  // get student info. the studentId is the QR code scanned result
  @objc func getInfo(studentId: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    var result = ["success" : "true"]
    result["name"] = "Ben"
    result["profile picture"] = "some really long weird string.." // only set this key if profile picture exists
    successCallBack([result])
    
    
    // check if realm has student already, if not, then you perform the api call
    
    
    //    // return verification code in callback
    //    GetApi.getStudentInfo(studentId, url: url,
    //
    //      // SuccessBlock (parse response to realm object)
    //      successBlock: { (response) in
    //
    //        // return true if get person info success
    //        var result = ["success" : "true"];
    //
    //        successCallBack([result])
    //      },
    //
    //      // FailureBlock (print the error message from server)
    //      failureBlock: { (response) in
    //
    //        // return false if get person info failed
    //        let result = ["success" : false];
    //        
    //        failureCallBack([result])
    //    })
    
    
  }
  
  // check student in
  @objc func checkIn(studentId: String, courseId: Int, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    let realm   = try! Realm()
    let student = realm.objects(StudentModel.self).filter("i_student_id = " + String(studentId)).first
    
    let attendance = AttendanceModel()
    attendance.i_attendance_id = getNextLocalId()
    attendance.b_attend = true
    attendance.NSDate_date = NSDate() // set the date to current day's date + course's start time
    attendance.i_course_id = courseId // filter by current system time and course start/end time & week of the day & student id.
    
    student?.List_checkInHistory.insert(attendance, atIndex: 0)

    
    
    
    
    var result = ["message" : "success"]
    successCallBack([result])
    
    
    // check if realm has student already, if not, then you perform the api call
    
    
    //    // return verification code in callback
    //    GetApi.getStudentInfo(studentId, url: url,
    //
    //      // SuccessBlock (parse response to realm object)
    //      successBlock: { (response) in
    //
    //        // return true if get person info success
    //        var result = ["success" : "true"];
    //
    //        successCallBack([result])
    //      },
    //
    //      // FailureBlock (print the error message from server)
    //      failureBlock: { (response) in
    //
    //        // return false if get person info failed
    //        let result = ["success" : false];
    //
    //        failureCallBack([result])
    //    })
    
    
  }

  
  
  // get student's class and attendance info
  @objc func getClassAndAttendanceInfo(studentId: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    let realm   = try! Realm()
    let student = realm.objects(StudentModel.self).filter("i_student_id = " + String(studentId)).first
    
    
    var courses = [Dictionary<String, String>]()
    
    for i in 0...((student?.List_courses.count)! - 1){
      
      courses[i]["company name"]          = student?.List_courses[i].s_company
      courses[i]["course name"]           = student?.List_courses[i].s_name
      courses[i]["course days"]           = student?.List_courses[i].s_dayOfTheWeek
      courses[i]["course start time"]     = student?.List_courses[i].NSDate_startTime?.description
      courses[i]["course end time"]       = student?.List_courses[i].NSDate_endTime?.description
      
      // query student's course attend count
      let courseId    = (student?.List_courses.filter("s_name = " + courses[i]["course name"]!).first)?.i_course_id
      let attendCount = student?.List_checkInHistory.filter("i_course_id = " + String(courseId) + " AND b_attend = " + "true").count
      courses[i]["course attend count"]  = String(attendCount)

      // query student's course leave count
      let leaveCount  = student?.List_checkInHistory.filter("i_course_id = " + String(courseId) + " AND b_leave = " + "true").count
      courses[i]["course leave count"]   = String(leaveCount)
    }
    
    successCallBack(courses)
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