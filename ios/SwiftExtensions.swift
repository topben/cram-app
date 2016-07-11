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