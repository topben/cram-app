//
//  SwiftExtensions.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/11.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation

extension NSDate{
  
  convenience init(dateString: String) {
    
    let dateStringFormatter = NSDateFormatter()
    dateStringFormatter.dateFormat = "yyyy-MM-dd"
//    dateStringFormatter.locale = NSLocale(localeIdentifier: "en_US_POSIX")
    let d = dateStringFormatter.dateFromString(dateString)!
    self.init(timeInterval:0, sinceDate:d)
  }
  
  func toFormattedString() -> String{
    
    let dateFormatter = NSDateFormatter()
    dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
    dateFormatter.timeZone = NSTimeZone(abbreviation: "UTC")
    let formattedDate = dateFormatter.stringFromDate(self)
    
    return formattedDate
  }
  
}