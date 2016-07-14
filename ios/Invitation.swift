//
//  Student.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/7/13.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(Invitation)
class Invitation: NSObject {
  
  // MARK: SIGN UP FUNCTIONS
  
  // get student info. the studentId is the QR code scanned result
  @objc func getInfo(user_id: String, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void{
    
    // get all invitations of the current user
    let realm   = try! Realm()
    let invitations = realm.objects(InvitationModel.self).filter("i_user_id = " + String(user_id))
   
    var result = [Dictionary<String, String>]()
    
    for i in 0...(invitations.count)-1{
    
      result[i]["date"]       = invitations[i].NSDate_date?.description
      result[i]["company"]    = invitations[i].s_company
      result[i]["message"]    = invitations[i].s_message
      result[i]["date"]       = invitations[i].NSDate_date?.description
      result[i]["permission"] = invitations[i].s_permission
      
      
      if invitations[i].b_isActivated{
        
        result[i]["status"]   = "activated"
      }
      else{
        
        if invitations[i].b_expired{
          
          result[i]["status"] = "expired"
        }
        else{
        
          result[i]["status"] = "pending"
        }
      }
      
      
    }
    
    successCallBack([result])
    
    
    // check if realm has invitations already, if not, then you perform the api call
    
    
    //    // return verification code in callback
    //    GetApi.getInfo(studentId, url: url,
    //
    //      // SuccessBlock (parse response to realm object)
    //      successBlock: { (response) in
    //
    //        // return true if get person info success
    //        var result = ["success" : "true"];
    //
    //        successCallBack([result])
    //      },
    //
    //      // FailureBlock (print the error message from server)
    //      failureBlock: { (response) in
    //
    //        // return false if get person info failed
    //        let result = ["success" : false];
    //
    //        failureCallBack([result])
    //    })
    
    
  }
  
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