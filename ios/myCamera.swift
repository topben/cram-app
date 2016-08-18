//
//  Camera.swift
//  TmotClass
//
//  Created by Robert Shapiro on 2016/8/18.
//  Copyright © 2016年 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

@objc(myCamera)
class myCamera: NSObject {
  
  // MARK: READY FUNCTIONS
  
  @objc func turnOnFlashLight(){
    
    let avDevice = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo)
    
    // check if the device has torch
    if avDevice.hasTorch {
      // lock your device for configuration
      do {
        let abv = try avDevice.lockForConfiguration()
      } catch {
        
      }
      
    // check if your torchMode is on or off. If on turns it off otherwise turns it on
    if !avDevice.torchActive {
      // sets the torch intensity to 100%
      do {
        let abv = try avDevice.setTorchModeOnWithLevel(0.5)
      } catch {
        
      }
    }
      // unlock your device
      avDevice.unlockForConfiguration()
    }
    
  }
  
  @objc func turnOffFlashLight(){
    
    let avDevice = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo)
    
    // check if the device has torch
    if avDevice.hasTorch {
      // lock your device for configuration
      do {
        let abv = try avDevice.lockForConfiguration()
      } catch {
        
      }
      
    // check if your torchMode is on or off. If on turns it off otherwise turns it on
    if avDevice.torchActive {
      // sets the torch intensity to 100%
      do {
        avDevice.torchMode = AVCaptureTorchMode.Off
      } catch {
        
      }
    }
      // unlock your device
      avDevice.unlockForConfiguration()
    }
    
  }
  
  @objc func setFlashLightBrightness(brightness: Float){
    
    if brightness > 1.0 || brightness < 0.0{
      return;
    }
    
    let avDevice = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo)
    
    // check if the device has torch
    if avDevice.hasTorch {
      // lock your device for configuration
      do {
        let abv = try avDevice.lockForConfiguration()
      } catch {
        
      }
      
    // check if your torchMode is on or off. If on turns it off otherwise turns it on
    if !avDevice.torchActive {
      // sets the torch intensity to 100%
      do {
        let abv = try avDevice.setTorchModeOnWithLevel(brightness)
      } catch {
        
      }
    }
    // unlock your device
    avDevice.unlockForConfiguration()
    }
    
  }
  
  @objc func focusOnPoint(brightness: Float){
  
    
  
  }
  
}
