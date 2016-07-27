//
//  MySwiftThingy.m
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Notification, NSObject)

RCT_EXTERN_METHOD(getCheckInNotification:(NSArray *)notification_id successCallBack:(RCTResponseSenderBlock) successCallBack)

@end

