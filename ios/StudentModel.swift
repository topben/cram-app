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
  
  dynamic var s_student_id          : String = ""
  dynamic var s_organization_id     : String = ""
  dynamic var s_qr_code_id          : String = ""
  dynamic var s_name                : String = ""
  dynamic var s_phone               : String = ""
  dynamic var s_email               : String = ""
  dynamic var s_organization_role   : String = ""
  dynamic var s_profile_picture_url : String = ""
  dynamic var b_isDelete            : Bool   = false
  
  static override func primaryKey() -> String?{
    return "s_student_id"
  }
  
  // parser for student(s)
  static func toRealmObject_list(data: Dictionary<String, AnyObject>) -> StudentModel{
    
    let studentModel = StudentModel()
    
    studentModel.s_student_id              = data["id"]                  as! String
    studentModel.s_qr_code_id              = data["qr_code_id"]          as! String
    studentModel.s_organization_id         = data["organization_id"]     as? String ?? ""
    studentModel.s_email                   = data["email"]               as? String ?? ""
    studentModel.s_phone                   = data["phone"]               as? String ?? ""
    studentModel.s_name                    = data["name"]                as! String
    studentModel.s_organization_role       = data["organization_role"]   as! String
    studentModel.s_profile_picture_url     = data["profile_picture_url"] as! String
   
    return studentModel
  }
  
}
