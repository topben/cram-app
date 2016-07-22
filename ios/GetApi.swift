//
//  GetApi.swift
//  TheUltimateCalendar
//
//  Created by robert on 5/9/16.
//  Copyright © 2016 robert. All rights reserved.
//

import Foundation
import Alamofire
import RealmSwift

class GetApi{
  
  // MARK: READY API
  
  // check verification code
  static func checkVerificationCode(verificationCode: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["code"] = verificationCode
    
    Alamofire.request(.GET, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      let statusCode = (response.response?.statusCode)!
      
      switch(statusCode){
        case 200 ... 299:
            print("Check verification code success.")
            successBlock(json as! Dictionary<String, AnyObject>)
            break
        default:
            print("Check verification code failed.")
            failureBlock(json as! Dictionary<String, AnyObject>)
            break
      } // end of switch
      
    } // end of request
    
  } // end of checkVerificationCode()
  
  
  // check username
  static func checkUsername(username: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["username"] = username
    
    Alamofire.request(.GET, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      let statusCode = (response.response?.statusCode)!
      
      switch(statusCode){
        case 200 ... 299:
          print("Check username success.")
          successBlock(json as! Dictionary<String, AnyObject>)
          break
        default:
          print("Check username failed.")
          break
      } // end of switch
      
    } // end of request
    
  } // end of checkUsername()
  
  
  // get user info
  static func getUserInfo(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      let statusCode = (response.response?.statusCode)!
      
      switch(statusCode){
        case 200 ... 299:
          print("Get user info success.")
          successBlock(json as! Dictionary<String, AnyObject>)
          break
        default:
          print("Get user info failed.")
          failureBlock(json as! Dictionary<String, AnyObject>)
          break
      } // end of switch
      
    } // end of request
    
  } // end of getUserInfo()

  
  
  
  
  
  // MARK: NOT USED YET
  
  
  // get user permission
  static func getUserPermission(invitationCode: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String: AnyObject]()
    parameters["invitationCode"] = invitationCode
    
    Alamofire.request(.GET, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      let status = json?["status"] as? String
      
      switch(response.result){
      case .Success:
        // change status later..
        if status == "0"{
          print("Get user permission success.") // JSON = \(json)")
          successBlock(json as! Dictionary<String, AnyObject>)
        }
        else{
          print("Get user permission failed.") // JSON = \(json)")
          failureBlock(json as! Dictionary<String, AnyObject>)
        }
        break
      case .Failure:
        print("connection error")
        break
      } // end of switch
      
    } // end of request
    
  } // end of getUserPermission()

  
  
  
  
} // end of class

