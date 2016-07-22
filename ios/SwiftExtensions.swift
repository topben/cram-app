//
//  SwiftExtensions.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation

extension Bool{
  
  func toString() -> String{
    
    if self.boolValue{
      return "true"
    }
    else{
      return "false"
    }
  }
  
}

extension NSDate{
  
  convenience init(dateString: String) {
    
    let dateStringFormatter = NSDateFormatter()
    dateStringFormatter.dateFormat = "yyyy-MM-dd"
//    dateStringFormatter.locale = NSLocale(localeIdentifier: "en_US_POSIX")
    let d = dateStringFormatter.dateFromString(dateString)!
    self.init(timeInterval:0, sinceDate:d)
  }
  
  
  
}