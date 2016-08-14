//
//  MySwiftThingy.m
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Parent, NSObject)

RCT_EXTERN_METHOD(getInfo:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(dontTakeDayOff:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(takeDayOff:(NSString *) student_id klass_id:(NSString *) klass_id url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

@end

