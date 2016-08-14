//
//  PatchApi.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import Alamofire

class DeleteApi{
  
  // MARK: READY
  
  // 取消請假
  static func dontTakeDayOff(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.DELETE, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("取消請假 success.")
        let success = ["success": "Status Code: " + String(statusCode)]
        successBlock(success)
        break
      default:
        print("取消請假 failed.")
        let error = ["error": "Status Code: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of dontTakeDayOff()

  
  
}