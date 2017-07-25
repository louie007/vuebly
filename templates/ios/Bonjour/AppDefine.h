//
//  AppDefine.h
//  Bonjour
//
//  Created by Vuebly on 15/07/2017.
//  Copyright © 2017 Louie Bao. All rights reserved.
//
#import <Foundation/Foundation.h>

#ifndef AppDefine_h
#define AppDefine_h

// Please check Xcode build phases: Get Current IP
#define CURRENT_IP [NSString stringWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"localServer-ip" ofType:@".txt"] encoding:NSUTF8StringEncoding error:nil]

#if TARGET_IPHONE_SIMULATOR
#define DEMO_HOST @"127.0.0.1"
#else
#define DEMO_HOST CURRENT_IP
#endif

// For debugging
#define HOME_URL [NSString stringWithFormat:@"http://%@:8080/static/js/index.js", DEMO_HOST]

// For packaging
#define BUNDLE_URL [NSString stringWithFormat:@"file://%@/assets/static/js/index.js",[NSBundle mainBundle].bundlePath]

#endif /* AppDefine_h */
