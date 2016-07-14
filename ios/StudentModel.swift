//
//  People.swift
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Student Model
class StudentModel: Object{
  
  dynamic var i_student_id       : Int     = 0
  dynamic var s_student_qrCode   : String  = ""
  dynamic var s_name             : String  = ""

          let List_courses                 = List<CourseModel>()         // courses this student is attending
          let List_checkInHistory          = List<AttendanceModel>()      // date/time this student checked in
  
  dynamic var data_profileImage  : NSData? = "".dataUsingEncoding(NSUTF8StringEncoding)
  dynamic var b_isDelete         : Bool    = false
    
  static override func primaryKey() -> String?{
    return "i_student_id"
  }
  
  // parser for single user
  static func toRealmObject(data: Dictionary<String, AnyObject>) -> StudentModel{
    
    let studentModel = StudentModel()
    
    studentModel.i_student_id              = Int(data["id"]           as! String)!
    studentModel.s_name                    = data["name"]             as! String
    studentModel.data_profileImage         = (data["profileImage"]    as! String).dataUsingEncoding(NSUTF8StringEncoding)
    
    return studentModel
  }
  
  static func toDictionary(studentId: Int) -> Dictionary<String, AnyObject>{
    
    let realm = try! Realm()
    let student = realm.objects(StudentModel.self).filter("i_student_id = " + String(studentId)).first
    
    var studentModel = [String: AnyObject]()
    
    studentModel["id"]            = student!.i_student_id
    studentModel["name"]          = student!.s_name
    studentModel["profileImage"]  = student!.data_profileImage
    
    return studentModel
  }
  

}