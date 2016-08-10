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
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Check verification code success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Check verification code failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of checkVerificationCode()
  
  
  // check username
  static func checkUsername(username: String, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    var parameters = [String : AnyObject]()
    parameters["username"] = username
    
    Alamofire.request(.GET, url, parameters: parameters).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Check username success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Check username failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of checkUsername()
  
  
  // get user info
  static func getUserInfo(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Get user info success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Get user info failed.")
          let error = ["error": "Server Error: " + String(statusCode)]
          failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getUserInfo()

  
  // get student info
  static func getStudentInfo(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
        case 200 ... 299:
          print("Get student info success.")
          successBlock(json as! Dictionary<String, AnyObject>)
          break
        default:
          print("Get student info failed.")
          let error = ["error": "Server Error: " + String(statusCode)]
          failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getStudentInfo()
  
  
  // get user notifications
  static func getNotifications(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Get notifications success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Get notifications failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getNotifications()
  
  
  
  // get course info
  static func getCourseInfo(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Get course info success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Get course info failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getCourseInfo()
  
  
  // get class info
  static func getClassInfo(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
        case 200 ... 299:
          print("Get class info success.")
          successBlock(json as! Dictionary<String, AnyObject>)
          break
        default:
          print("Get class info failed.")
          let error = ["error": "Server Error: " + String(statusCode)]
          failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getClassInfo()

  
  // get attendance info
  static func getAttendanceInfo(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
        case 200 ... 299:
          print("Get attendance info success.")
          successBlock(json as! Dictionary<String, AnyObject>)
          break
        default:
          print("Get attendance info failed.")
          let error = ["error": "Server Error: " + String(statusCode)]
          failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getAttendanceInfo()
  
  
  // get teacher info
  static func getTeacherInfo(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Get teacher info success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Get teacher info failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getTeacherInfo()
  
  
  // get organization info
  static func getOrganizationInfo(url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Get organization info success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Get organization info failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getOrganizationInfo()
  

  // get list of students in a specific course
  static func getStudentList(url: String, successBlock:Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){ 
    
    Alamofire.request(.GET, url, parameters: nil).responseJSON { response in
      
      let json = response.result.value
      
      var statusCode = 404
      
      if(response.response?.statusCode != nil){
        statusCode = (response.response?.statusCode)!
      }
      
      switch(statusCode){
      case 200 ... 299:
        print("Get student list of course success.")
        successBlock(json as! Dictionary<String, AnyObject>)
        break
      default:
        print("Get student list of course failed.")
        let error = ["error": "Server Error: " + String(statusCode)]
        failureBlock(error)
      } // end of switch
      
    } // end of request
    
  } // end of getStudentList()

  
  
  
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

