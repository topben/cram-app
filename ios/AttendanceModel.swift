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
  
  dynamic var s_attendance_id    : String = ""
  dynamic var s_klass_id         : String = ""
  dynamic var s_student_id       : String = ""
  dynamic var s_teacher_id       : String = ""
  dynamic var s_check_in_method  : String = ""
  dynamic var s_status           : String = ""
  dynamic var i_arrived_at       : Int    = 0
  dynamic var b_isDelete         : Bool = false
  
  static override func primaryKey() -> String?{
    return "s_attendance_id"
  }
  
  // parser for single user
  static func toRealmObject_list(data: Dictionary<String, AnyObject>) -> AttendanceModel{
    
    let attendanceModel = AttendanceModel()
    
    attendanceModel.s_attendance_id   = data["id"]              as? String ?? ""
    attendanceModel.s_klass_id        = data["klass_id"]        as? String ?? ""
    attendanceModel.s_student_id      = data["student_id"]      as? String ?? ""
    attendanceModel.s_teacher_id      = data["teacher_id"]      as? String ?? ""
    attendanceModel.s_check_in_method = data["check_in_method"] as? String ?? ""
    attendanceModel.s_status          = data["status"]          as? String ?? ""
    attendanceModel.i_arrived_at      = data["arrived_at"]      as? Int    ?? 0
    
    return attendanceModel
  }
  
  
  
  
  
  
  
  
}