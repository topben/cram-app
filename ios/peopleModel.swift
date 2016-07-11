////
////  People.swift
////  CramSchoolLibrary
////
////  Created by Robert Shapiro on 7/4/16.
////  Copyright © 2016 Facebook. All rights reserved.
////
//
//import Foundation
//import RealmSwift
//
//// People Model
//class PeopleModel: Object{
//  
//  dynamic var i_people_id   : Int    = 0
//  dynamic var s_name        : String = ""
//  dynamic var s_email       : String = ""
//  dynamic var s_phone       : String = ""
//  dynamic var b_isDelete    : Bool   = false
//  
//  static override func primaryKey() -> String?{
//      return "i_people_id"
//  }
//  
//  // parser for single user
//  static func toRealmObject(data: Dictionary<String, AnyObject>) -> PeopleModel{
//    
//    let peopleModel = PeopleModel()
//    
//    peopleModel.i_people_id   = Int(data["result"]?["id"] as! String)!
//    peopleModel.s_email       = data["result"]?["email"]  as! String
//    peopleModel.s_phone       = data["result"]?["phone"]  as! String
//    peopleModel.s_name        = data["result"]?["name"]   as! String
//    
//    return peopleModel
//  }
//
//}