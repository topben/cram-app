//
//  Camera.m
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/18.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Camera, NSObject)

RCT_EXTERN_METHOD(turnOnFlashLight)

RCT_EXTERN_METHOD(turnOffFlashLight)

RCT_EXTERN_METHOD(setFlashLightBrightness:(NSFloat *) brightness)

RCT_EXTERN_METHOD(focusOnPoint: (NSDouble *) x y:(NSDouble) y)

@end

