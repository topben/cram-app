//
//  MessageModel.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/15.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Message Model
class MessageModel: Object{
  
  dynamic var i_message_id    : Int    = 0
  dynamic var s_content       : String = ""
  dynamic var s_name          : String = ""
  dynamic var NSDate_date     : NSDate?
  dynamic var b_isDelete      : Bool   = false
  
  static override func primaryKey() -> String?{
    return "i_message_id"
  }
  
}