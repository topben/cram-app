//
//  Classes.m
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Klass, NSObject)

RCT_EXTERN_METHOD(getInfo:(NSString *) url successCallBack:(RCTResponseSenderBlock) successCallBack failureCallBack:(RCTResponseSenderBlock) failureCallBack)

@end

