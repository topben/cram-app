//
//  DirectMessage.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// DirectMessage Model
class DirectMessageModel: Object{
  
  dynamic var i_directMessage_id : Int    = 0
  dynamic var s_from_name        : String = ""
  dynamic var s_to_name          : String = ""
  dynamic var NSDate_date        : NSDate?
  dynamic var Message_message    : MessageModel?
  dynamic var b_isDelete         : Bool   = false
  
  static override func primaryKey() -> String?{
    return "i_directMessage_id"
  }
  
}