//
//  MySwiftThingy.m
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(User, NSObject)

RCT_EXTERN_METHOD(getVerificationCode:(NSString *)phone url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(checkVerificationCode:(NSString *) verificationCode url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(checkUsername:(NSString *)username url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(create:(NSDictionary *)userInfo url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(activateInvitationCode:(NSString *)invitationCode url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(getUserPermission:(NSString *)invitationCode url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(login:(NSString *)username phone:(NSString *) phone password:(NSString *) password url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(updateInRealm:(NSInteger *)user_id password:(NSString *) password email:(NSString *) email url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

RCT_EXTERN_METHOD(updateInServer:(NSInteger *)user_id url:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)


RCT_EXTERN_METHOD(callbackMethod:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(simpleMethod:(NSString *)message)

@end

