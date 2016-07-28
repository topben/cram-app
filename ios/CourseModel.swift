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
  dynamic var i_frequency        : Int    = 0
  dynamic var s_period           : String = ""
  dynamic var b_isDelete         : Bool   = false
  
  static override func primaryKey() -> String?{
    return "s_course_id"
  }
  
  // parser for single course
  static func toRealmObject(data: Dictionary<String, AnyObject>) -> CourseModel{
    
    let result = data["result"]!
    
    let courseModel = CourseModel()
    
    courseModel.s_name     = result["name"]            as! String
    
    return courseModel
  }
  
}