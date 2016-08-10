//
//  MySwiftThingy.m
//  CramSchoolLibrary
//
//  Created by Robert Shapiro on 7/4/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Organization, NSObject)

RCT_EXTERN_METHOD(getInfo:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock)failureCallBack)

@end

