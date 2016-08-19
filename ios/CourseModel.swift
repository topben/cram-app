//
//  People.swift
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Course Model
class CourseModel: Object{
  
  dynamic var s_course_id        : String = ""
  dynamic var s_name             : String = ""
  dynamic var s_organization_id  : String = ""
  dynamic var b_isDelete         : Bool   = false
  
  
  static override func primaryKey() -> String?{
    return "s_course_id"
  }
  
  // parser for single course
  static func toRealmObject_list(data: Dictionary<String, AnyObject>) -> CourseModel{
    
    let courseModel = CourseModel()

    courseModel.s_course_id       = data["id"]              as? String ?? ""
    courseModel.s_name            = data["name"]            as? String ?? ""
    courseModel.s_organization_id = data["organization_id"] as? String ?? ""
   
    return courseModel
  }
  
}

class CourseStudentModel: Object{
  
  dynamic var s_course_id : String = ""
          let students             = List<myString>()
  
  static override func primaryKey() -> String?{
    return "s_course_id"
  }
}

class myString: Object{
  dynamic var string : String = ""
}


// CourseDetails Model
class CourseDetailsModel: Object{
  
  dynamic var year        : String = ""
  dynamic var month        : String = ""
  dynamic var date        : String = ""
  dynamic var day        : String = ""
  dynamic var start_time        : String = ""
  dynamic var end_time        : String = ""
  dynamic var teacher        : String = ""
  dynamic var organization        : String = ""
  dynamic var location        : String = ""
  dynamic var course_name        : String = ""
  dynamic var student_name        : String = ""
  dynamic var classes_left        : String = ""
  dynamic var arrival_count        : String = ""
  dynamic var leave_count        : String = ""
  dynamic var absent_count        : String = ""
  dynamic var s_student_id        : String = ""
  dynamic var s_parent_id        : String = ""
  dynamic var s_course_id        : String = ""
  dynamic var s_klass_id        : String = ""
  dynamic var s_attendance_id        : String = ""
  
  }
