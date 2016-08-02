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
  
  dynamic var s_student_id          : String  = ""
  dynamic var s_student_qrCode      : String  = ""
  dynamic var s_name                : String  = ""
  dynamic var s_group_role          : String  = ""
  dynamic var s_profile_picture_url : String  = ""
  dynamic var b_isDelete            : Bool    = false
  
  static override func primaryKey() -> String?{
    return "s_student_id"
  }
  
  // parser for student(s)
  static func toRealmObject_list(data: Dictionary<String, AnyObject>) -> StudentModel{
    
    let studentModel = StudentModel()
    
    studentModel.s_student_id              = data["id"]             as! String
    studentModel.s_student_qrCode          = data["qr_code_id"]     as! String
    studentModel.s_name                    = data["name"]           as! String
    studentModel.s_group_role              = data["group_role"]     as! String
    studentModel.s_profile_picture_url     = data["profile_picture_url"]     as! String
    
    return studentModel
  }
  
}
