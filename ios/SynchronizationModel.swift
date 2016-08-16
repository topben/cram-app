//
//  ClassModel.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

// Settings Model
class SynchronizationModel: Object{
  
  // attendance table id   : 0
  // notification table id : 1
  
  dynamic var i_table_id        : Int = 0
  
  dynamic var s_table_name      : String = ""
  dynamic var i_last_updated_at : Int    = 0
  
  static override func primaryKey() -> String?{
    return "i_table_id"
  }
  
}