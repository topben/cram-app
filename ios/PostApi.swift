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
      
      switch(response.result){
        case .Success:
          if (response.response?.statusCode)! == "200"{
            print("Send verification code success.")
            successBlock(json as! Dictionary<String, AnyObject>)
          }
          else{
            print("Send verification code failed.")
            failureBlock(json as! Dictionary<String, AnyObject>)
          }
          break
        case .Failure:
          print("connection error")
          break
      } // end of switch
      
    } // end of request
    
  } // end of getVerificationCode()
  
  
  // create user
  static func createUser(userInfo: Dictionary<String, AnyObject>, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){

    Alamofire.request(.POST, url, parameters: userInfo).responseJSON { response in
      
      let json = response.result.value
      
      switch(response.result){
        case .Success:
          if (response.response?.statusCode)! == "200"{
            print("Create user success.")
            successBlock(json as! Dictionary<String, AnyObject>)
          }
          else{
            print("Create user failed.")
            failureBlock(json as! Dictionary<String, AnyObject>)
          }
          break
        case .Failure:
          print("connection error")
          break
      } // end of switch
      
    } // end of request
    
  } // end of createUser()
  

  

  
  
  
  
  
  
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

  
  //login
  static func login(username: String, password: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["username"] = username
    parameters["password"] = password
    
    Alamofire.request(.POST, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      let status = json?["status"] as? String
      
      switch(response.result){
      case .Success:
        // change status later..
        if status == "0"{
          print("Log in success.") // JSON = \(json)")
          successBlock(json as! Dictionary<String, AnyObject>)
        }
        else{
          print("Log in failed.") // JSON = \(json)")
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

