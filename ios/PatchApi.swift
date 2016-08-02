//
//  PatchApi.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import Alamofire

class PatchApi{
  
  // MARK: READY
  
  // change user password
  static func changeUserPassword(password: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    let parameters = ["password" : password]
    
    Alamofire.request(.PATCH, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
        case 200 ... 299:
          print("Change user password success.")
          successBlock(json as! Dictionary<String, AnyObject>)
          break
        default:
          print("Change user password failed.")
          let error = ["error": "Server Error: " + String(statusCode)]
          failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of changeUserPassword()

  
  // change user email
  static func changeUserEmail(email: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    let parameters = ["email" : email]
    
    Alamofire.request(.PATCH, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Change user email success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Change user email failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of changeUserEmail()
  
  
  // MARK: NOT READY
  
  // change user profile picture
  static func changeUserProfileImage(image: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    let parameters = ["profile_picture" : image]
    
    Alamofire.request(.PATCH, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
        case 200 ... 299:
          print("Change user image success.")
          successBlock(json as! Dictionary<String, AnyObject>)
          break
        default:
          print("Change user image failed.")
          let error = ["error": "Server Error: " + String(statusCode)]
          failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of changeUserProfileImage()
  
}