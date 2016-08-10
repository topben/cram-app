//
//  Student.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/13.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(Organization)
class Organization: NSObject {
  
  // MARK: READY FUNCTIONS
  
  // get full list of organizations
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    // return verification code in callback
    GetApi.getOrganizationInfo(url,
                          
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        if response["result"]?.count > 0{
          
          let response = ((response["result"]! as! NSArray) as Array)
          
          for i in 0...(response.count-1){
            
            let organizationModel = OrganizationModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(organizationModel)
          } // end of for loop
        } // end of if statement
        
        let result = ["success" : "true"];
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        var result = ["success" : "false"];
        result["msg"] = (response["error"] as! String)
        failureCallBack([result])
    })
    
    
  } // end of getInfo()
  
  
  // MARK: NOT READY FUNCTIONS
  
  // private methods just for swift
  func saveToRealm(realmObject: Object){
    
    let realm = try! Realm()
    try! realm.write({
      realm.add(realmObject, update: true)
    })
  }
  
  // for attendance
  func getNextLocalId() -> Int{
    
    let realm = try! Realm()
    
    return realm.objects(AttendanceModel.self).count + 1
  }
  
  
  
}