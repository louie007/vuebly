package com.vuebly.bonjour;

import android.app.Application;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;
import com.vuebly.bonjour.extend.compontent.RichText;
import com.vuebly.bonjour.extend.module.PhoneInfoModule;

/**
 * Created by Louie Bao on 13/07/2017.
 */

public class WXApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        InitConfig config = new InitConfig.Builder().setImgAdapter(new ImageAdapter()).build();
        WXSDKEngine.initialize(this,config);
        try {
            WXSDKEngine.registerModule("poneInfo", PhoneInfoModule.class);
            WXSDKEngine.registerComponent("rich", RichText.class, false);
        } catch (WXException e) {
            e.printStackTrace();
        }
    }
}