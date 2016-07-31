//
//  People.swift
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Invitation Model
class InvitationModel: Object{
  
  dynamic var i_invitation_id    : Int    = 0
  dynamic var i_user_id          : Int    = 0
  dynamic var s_company          : String = ""
  dynamic var s_permission       : String = ""
  dynamic var s_message          : String = ""
  dynamic var NSDate_date        : NSDate?
  dynamic var b_isActivated      : Bool   = false
  dynamic var b_expired          : Bool   = false
  dynamic var b_isDelete         : Bool   = false
  
  static override func primaryKey() -> String?{
    return "i_invitation_id"
  }
  
  // parser for single course
  static func toRealmObject(data: Dictionary<String, AnyObject>) -> InvitationModel{
    
    let invitationModel = InvitationModel()
    
    
    return invitationModel
  }
    
}