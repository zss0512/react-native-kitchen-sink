/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "IQKeyboardManager.h"
#import "RCTSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //设置键盘遮挡
  IQKeyboardManager *manager = [IQKeyboardManager sharedManager];
  //开启，默认为YES
  manager.enable = YES;
  //控制点击背景是否收起键盘，默认为NO
  manager.shouldResignOnTouchOutside = YES;
  //控制键盘上的工具条文字颜色是否用户自定义
  manager.shouldToolbarUsesTextFieldTintColor = YES;
  //控制是否显示键盘上的工具条，默认为YES
  manager.enableAutoToolbar = NO;
  //是否显示Placeholder，默认为YES
  manager.shouldShowTextFieldPlaceholder = YES;
  //设置顺序为按照位置
  manager.toolbarManageBehaviour = IQAutoToolbarByPosition;
  
#ifdef DEBUG
  NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
//  NSURL *jsCodeLocation = [NSURL URLWithString:@"/Users/fang/rn/KitchenSink/tools/release/index.bundle"];
  
#else //DEBUG
  NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif //DEBUG
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"KitchenSink"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  [RCTSplashScreen show:rootView];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
