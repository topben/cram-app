//
//  Classes.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import RealmSwift

@objc(Klass)
class Klass: NSObject {
  
  // MARK: READY FUNCTIONS
  
  
  // get class(s) info from realm
  @objc func getInfo(start_date: Int, end_date: Int, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
  
    let realm = try! Realm()
    
    let classes = realm.objects(KlassModel.self).filter("i_start_date >= " + String(start_date)).filter("i_end_date <= " + String(end_date))
    
    print(classes)
    
    try! realm.write({
      
      
      
      
    })
    
    
  }
  
  // get class(s) info from server
  @objc func getInfo(url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
    
    // return verification code in callback
    GetApi.getClassInfo(url,
                          
      // SuccessBlock (parse response to realm object)
      successBlock: { (response) in
        
        let response = ((response["result"]! as! NSArray) as Array)
        
        if response.count > 0{
          
          for i in 0...(response.count-1){
            let klassModel = KlassModel.toRealmObject_list(response[i] as! Dictionary<String, AnyObject>)
            self.saveToRealm(klassModel)
          }
          
        }
        // return true if get person info success
        let result = ["success" : "true"];
        
        successCallBack([result])
      },
      
      // FailureBlock (print the error message from server)
      failureBlock: { (response) in
        
        // return false if get person info failed
        var result = ["success" : "false"];
        result["msg"] = (response["error"] as! String)
        
        failureCallBack([result])
    }) // end of api call
    
    
  } // end getInfo()
  
  // private methods just for swift
  func saveToRealm(realmObject: Object){
    
    let realm = try! Realm()
    try! realm.write({
      realm.add(realmObject, update: true)
    })
  }


}

