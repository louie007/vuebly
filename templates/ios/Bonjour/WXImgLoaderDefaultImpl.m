//
//  WXImgLoaderDefaultImpl.m
//  Bonjour
//
//  Created by Vuebly on 15/07/2017.
//  Copyright © 2017 Louie Bao. All rights reserved.
//

#import "WXImgLoaderDefaultImpl.h"
#import <SDWebImage/UIImageView+WebCache.h>

#define MIN_IMAGE_WIDTH 36
#define MIN_IMAGE_HEIGHT 36


#if OS_OBJECT_USE_OBJC
#undef  WXDispatchQueueRelease
#undef  WXDispatchQueueSetterSementics
#define WXDispatchQueueRelease(q)
#define WXDispatchQueueSetterSementics strong
#else
#undef  WXDispatchQueueRelease
#undef  WXDispatchQueueSetterSementics
#define WXDispatchQueueRelease(q) (dispatch_release(q))
#define WXDispatchQueueSetterSementics assign
#endif

@interface WXImgLoaderDefaultImpl()

@property (WXDispatchQueueSetterSementics, nonatomic) dispatch_queue_t ioQueue;

@end

@implementation WXImgLoaderDefaultImpl

#pragma mark -
#pragma mark WXImgLoaderProtocol

- (id<WXImageOperationProtocol>)downloadImageWithURL:(NSString *)url imageFrame:(CGRect)imageFrame userInfo:(NSDictionary *)userInfo completed:(void(^)(UIImage *image,  NSError *error, BOOL finished))completedBlock
{
    if ([url hasPrefix:@"//"]) {
        url = [@"http:" stringByAppendingString:url];
    }
    // Load local image
    if ([url hasPrefix:@"file://"]) {
        [url lastPathComponent];
        NSString *newUrl = [NSString stringWithFormat:@"file://%@/assets/static/images/%@", [NSBundle mainBundle].bundlePath, [url lastPathComponent]];
        UIImage *image = [UIImage imageNamed:[newUrl substringFromIndex:7]];
        completedBlock(image, nil, YES);
        return (id<WXImageOperationProtocol>) self;
    } else {
        // Load remote image
        return (id<WXImageOperationProtocol>)[[SDWebImageManager sharedManager]downloadImageWithURL:[NSURL URLWithString:url] options:0 progress:^(NSInteger receivedSize, NSInteger expectedSize) {
        } completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, BOOL finished, NSURL *imageURL) {
            if (completedBlock) {
                completedBlock(image, error, finished);
            }
        }];
    }
}

@end
