//
//  NotificationModel.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Organization Model
class OrganizationModel: Object{
  
  dynamic var s_organization_id     : String = ""
  dynamic var s_name                : String = ""
  dynamic var b_isDelete            : Bool   = false
  
  static override func primaryKey() -> String?{
    return "s_organization_id"
  }
  
  
  // parser for getting all notifications
  static func toRealmObject_list(data: Dictionary<String, AnyObject>) -> OrganizationModel{
    
    let organizationModel = OrganizationModel()
    
    organizationModel.s_organization_id =     data["id"]   as? String ?? ""
    organizationModel.s_name            =     data["name"] as? String ?? ""
    
    return organizationModel
  }
  
}