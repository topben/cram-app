//
//  People.swift
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Attendance Model
class AttendanceModel: Object{
  
  dynamic var i_attendance_id    : Int          = 0
  dynamic var i_course_id        : Int          = 0 // use this id to filter course details
  dynamic var i_student_id       : Int          = 0
  dynamic var NSDate_date        : NSDate?          // ex: 7/16/2016 is enough
  dynamic var b_attend           : Bool = false
  dynamic var b_leave            : Bool = false
  dynamic var b_isDelete         : Bool = false
  
  static override func primaryKey() -> String?{
    return "i_attendance_id"
  }
  
  // parser for single user
  static func toRealmObject(data: Dictionary<String, AnyObject>) -> AttendanceModel{
    
    let attendanceModel = AttendanceModel()
    
  
    return attendanceModel
  }
  
  static func toDictionary(attendanceId: Int) -> Dictionary<String, AnyObject>{
    
    let realm = try! Realm()
    let student = realm.objects(UserModel.self).filter("i_student_id = " + String(attendanceId)).first
    
    var attendanceModel = [String: AnyObject]()
    
    
    return attendanceModel
  }
  
}