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

class PutApi{
  
  static let        domain:       String =              "https://www.tmot.net/api/"
  
  
  // update user
  static func updateUser(user_id: Int, url: String, successBlock: Dictionary<String, AnyObject> -> Void, failureBlock: Dictionary<String, AnyObject> -> Void){
        
    Alamofire.request(.PUT, domain + url, parameters: UserModel.toDictionary(user_id)).responseJSON { response in
      
      let json = response.result.value
      let status = json?["status"] as? String
      
      switch(response.result){
      case .Success:
        // change status later..
        if status == "0"{
          print("Update user success.") // JSON = \(json)")
          successBlock(json as! Dictionary<String, AnyObject>)
        }
        else{
          print("Update user failed.") // JSON = \(json)")
          failureBlock(json as! Dictionary<String, AnyObject>)
        }
        break
      case .Failure:
        print("connection error")
        break
      } // end of switch
      
    } // end of request
    
  } // end of getUsers()
  
  
  
  
  
} // end of class

