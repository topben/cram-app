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
  
  static let        domain:       String =              "https://www.tmot.net/api/"
  
  
  // create user
  static func createUser(userInfo: Dictionary<String, AnyObject>, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){

    Alamofire.request(.POST, domain + url, parameters: userInfo).responseJSON { response in
      
      let json = response.result.value
      let status = json?["status"] as? String
      
      switch(response.result){
      case .Success:
        // change status later..
        if status == "0"{
          print("Create user success.") // JSON = \(json)")
          successBlock(json as! Dictionary<String, AnyObject>)
        }
        else{
          print("Create user failed.") // JSON = \(json)")
          failureBlock(json as! Dictionary<String, AnyObject>)
        }
        break
      case .Failure:
        print("connection error")
        break
      } // end of switch
      
    } // end of request
    
  } // end of createUser()
  

  // check verification code
  static func checkVerificationCode(phone: String, verificationCode: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["phone"] = phone
    parameters["verificationCode"] = verificationCode
    
    Alamofire.request(.POST, domain + url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      let status = json?["status"] as? String
      
      switch(response.result){
      case .Success:
        // change status later..
        if status == "0"{
          print("Check verification code success.") // JSON = \(json)")
          successBlock(json as! Dictionary<String, AnyObject>)
        }
        else{
          print("Check verification code failed.") // JSON = \(json)")
          failureBlock(json as! Dictionary<String, AnyObject>)
        }
        break
      case .Failure:
        print("connection error")
        break
      } // end of switch
      
    } // end of request
    
  } // end of checkVerificationCode()


  // check username
  static func checkUsername(username: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["username"] = username
    
    Alamofire.request(.POST, domain + url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      let status = json?["status"] as? String
      
      switch(response.result){
      case .Success:
        // change status later..
        if status == "0"{
          print("Check username success.") // JSON = \(json)")
          successBlock(json as! Dictionary<String, AnyObject>)
        }
        else{
          print("Check username failed.") // JSON = \(json)")
          failureBlock(json as! Dictionary<String, AnyObject>)
        }
        break
      case .Failure:
        print("connection error")
        break
      } // end of switch
      
    } // end of request
    
  } // end of checkVerificationCode()

  
  // activate invitation code
  static func activateInvitationCode(invitationCode: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["invitationCode"] = invitationCode
    
    Alamofire.request(.POST, domain + url, parameters: parameters).responseJSON { response in
      
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
    
    Alamofire.request(.POST, domain + url, parameters: parameters).responseJSON { response in
      
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

