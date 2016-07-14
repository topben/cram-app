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
  
  dynamic var i_course_id        : Int    = 0
  dynamic var s_name             : String = ""
  dynamic var s_dayOfTheWeek     : String = ""
  dynamic var s_company          : String = ""
  dynamic var NSDate_startTime   : NSDate?
  dynamic var NSDate_endTime     : NSDate?
  dynamic var NSDate_checkInTime : NSDate?
  dynamic var NSDate_lateTime    : NSDate?
  dynamic var User_instructor    : User? // the teacher for this course
          let List_students               = List<StudentModel>() // students in this course
  dynamic var b_isDelete         : Bool   = false
  
  static override func primaryKey() -> String?{
    return "i_course_id"
  }
  
  // parser for single course
  static func toRealmObject(data: Dictionary<String, AnyObject>) -> CourseModel{
    
    let courseModel = CourseModel()
    
   
    return courseModel
  }
  
  static func toDictionary(courseId: Int) -> Dictionary<String, AnyObject>{
    
    let realm = try! Realm()
    let course = realm.objects(CourseModel.self).filter("i_course_id = " + String(courseId)).first
    
    var courseModel = [String: AnyObject]()
    
    
    return courseModel
  }
  
}