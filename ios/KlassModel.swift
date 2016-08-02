//
//  ClassModel.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Klass Model
class KlassModel: Object{
  
  dynamic var s_klass_id    : String = ""
  dynamic var s_course_id   : String = ""
  dynamic var s_teacher_id  : String = ""
  dynamic var s_location    : String = ""
  dynamic var i_start_date  : Int    = 0
  dynamic var i_end_date    : Int    = 0
  dynamic var b_isDelete    : Bool   = false
  
  static override func primaryKey() -> String?{
    return "s_klass_id"
  }
  
  // parser for getting all klasses info
  static func toRealmObject_list(data: Dictionary<String, AnyObject>) -> KlassModel{
    
    let klassModel = KlassModel()
    
    klassModel.s_klass_id     = data["id"]             as! String
    klassModel.s_course_id    = data["course_id"]      as? String ?? ""
    klassModel.s_teacher_id   = data["teacher_id"]     as? String ?? "TBA"
    klassModel.s_location     = data["location"]       as? String ?? "TBA"
    klassModel.i_start_date   = data["start_date"] as! Int
    klassModel.i_end_date     = data["end_date"]   as! Int
    
    return klassModel
    
  }

  
}