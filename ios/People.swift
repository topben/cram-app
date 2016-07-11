////
////  MySwiftThingy.swift
////  CramSchoolLibrary
////
////  Created by Robert Shapiro on 7/4/16.
////  Copyright © 2016 Facebook. All rights reserved.
////
//
//import Foundation
//import RealmSwift
//
//@objc(People)
//class People: NSObject {
//  
//  
//  // create new person in realm
//  @objc func createPersonInRealm(name: String, phone: String, email: String) -> Void{
//    
//    let peopleModel = PeopleModel()
//    
//    peopleModel.s_name       = name
//    peopleModel.s_phone      = phone
//    peopleModel.s_email      = email
//    
//    saveToRealm(peopleModel)
//  
//  } // end of createPersonInRealm()
//  
//  // create person info in server
//  @objc func createPersonInServer(id: Int, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
//    
//    PostApi.createPerson(id, url: url,
//                         
//      // SuccessBlock (parse response to realm object)
//      successBlock: { (response) in
//        
//        // return true if get person info success
//        let result = ["success" : true];
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
//    
//  } // end of createPersonInServer()
//  
//  
//  // update person in realm
//  @objc func updatePersonInRealm(people_id: Int, name: String?, phone: String?, email: String?) -> Void{
//    
//    let realm = try! Realm()
//    let peopleModel = realm.objects(PeopleModel).filter("i_people_id = " + String(people_id)).first
//    
//    // if there is new data, use it, or else, use the old data
//    peopleModel!.s_name       = name  ?? peopleModel!.s_name
//    peopleModel!.s_phone      = phone ?? peopleModel!.s_phone
//    peopleModel!.s_email      = email ?? peopleModel!.s_email
//    
//    saveToRealm(peopleModel!)
//  
//  } // end of updatePersonInRealm()
//
//  
//  
//  // update person info in server
//  @objc func updatePersonInServer(id: Int, url: String, successCallBack: RCTResponseSenderBlock, failureCallBack: RCTResponseSenderBlock) -> Void {
//   
//    PutApi.updatePerson(id, url: url,
//                     
//      // SuccessBlock (parse response to realm object)
//      successBlock: { (response) in
//        
//        // return true if get person info success
//        let result = ["success" : true];
//
//        successCallBack([result])
//      },
//      
//      // FailureBlock (print the error message from server)
//      failureBlock: {
//        (response) in
//        print(response)
//        
//        // return false if get person info failed
//        let result = ["success" : false];
//        
//        failureCallBack([result])
//      })
//  
//  } // end of updatePersonInServer()
//
//  
//  @objc func callbackMethod(callback: RCTResponseSenderBlock) -> Void {
//    
//    let resultsDict = [
//      "success" : true
//    ];
//    
//    callback([NSNull() ,resultsDict])
//    
//  }
//  
//  @objc func simpleMethod(message: String!) {
//    
//    let documentPath = NSSearchPathForDirectoriesInDomains(.DocumentDirectory, .UserDomainMask, true)[0]
//    print(documentPath)
//    
//  }
//  
//  
//  // private method just for swift
//  func saveToRealm(realmObject: Object){
//    
//    let realm = try! Realm()
//    try! realm.write({
//      realm.add(realmObject, update: true)
//    })
//  }
//  
//}