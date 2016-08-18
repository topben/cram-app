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

class PostApi{
  
  // MARK: READY API
  
  
  // send verification code
  static func sendVerificationCode(phone: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String: AnyObject]()
    parameters["phone"] = phone
    
    Alamofire.request(.POST, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Send verification code success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Send verification code failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getVerificationCode()
  
  // create user
  static func createUser(userInfo: Dictionary<String, AnyObject>, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.POST, url, parameters: userInfo).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Create user success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Create user failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of createUser()
  
  
  // login
  static func login(username: String, password: String, grantType: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["grant_type"] = grantType
    parameters["username"]   = username
    parameters["password"]   = password
    
    Alamofire.request(.POST, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Log in success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Log in failed.")
        let error = ["error": "Status Code: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of login()
  
  
  // refreshToken()
  static func refreshToken(refreshToken: String, grantType: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["grant_type"] = grantType
    parameters["refresh_token"]   = refreshToken
    
    Alamofire.request(.POST, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Refresh token success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Refresh token failed.")
        let error = ["error": "Status Code: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of refreshToken()
  
  
  
  // student check in
  static func checkIn(qrCode_id: String, checkIn_method: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["qr_code_id"] = qrCode_id
    parameters["check_in_method"]   = checkIn_method
    
    Alamofire.request(.POST, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
        case 200 ... 299:
          print("Check in success.")
          successBlock(json as! Dictionary<String, AnyObject>)
          break
        default:
          print("Check in failed.")
          let error = ["error": "Status Code: " + String(statusCode)]
          failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of login()
  
  
  // 請假
  static func takeDayOff(student_id: String, klass_id: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["student_id"] = student_id
    parameters["klass_id"]   = klass_id
    parameters["leave_from"] = "parent"
    
    Alamofire.request(.POST, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("請假 success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("請假 failed.")
        let error = ["error": "Status Code: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of takeDayOff()

  
  
  
  // MARK: NOT USED YET
  
  
  
  // activate invitation code
  static func activateInvitationCode(invitationCode: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["invitationCode"] = invitationCode
    
    Alamofire.request(.POST, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      let status = json?["status"] as? String
      
      switch(response.result){
      case .Success:
        // change status later..
        if status == "0"{
          print("Activate invitation code success.") // JSON = \(json)")
          successBlock(json as! Dictionary<String, AnyObject>)
        }
        else{
          print("Activate invitation code failed.") // JSON = \(json)")
          failureBlock(json as! Dictionary<String, AnyObject>)
        }
        break
      case .Failure:
        print("connection error")
        break
      } // end of switch
      
    } // end of request
    
  } // end of activateInvitationCode()
  
  
  
  
  
} // end of class

