//
//  MySwiftThingy.m
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Invitation, NSObject)

RCT_EXTERN_METHOD(getVerificationCode:(NSString *)phone url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(activate:(NSString *)phone url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(checkStatus:(NSString *)phone url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)


@end

