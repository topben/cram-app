//
//  MySwiftThingy.m
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Teacher, NSObject)

RCT_EXTERN_METHOD(checkIn:(NSString *)qrCode_id checkIn_method:(NSString *) checkIn_method url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

@end

