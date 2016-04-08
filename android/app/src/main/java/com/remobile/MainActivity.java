package com.remobile;

import android.app.ActionBar;
import android.app.Activity;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.view.KeyEvent;
import android.content.Intent;

import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;

import com.remobile.des.*;
import com.remobile.imagePicker.*;
import com.remobile.camera.*;
import com.remobile.toast.*;
import com.remobile.filetransfer.*;
import com.remobile.dialogs.*;
import com.remobile.datetimepicker.*;
import com.learnium.RNDeviceInfo.*;
import com.remobile.splashscreen.*;
import com.remobile.sqlite.*;
import com.remobile.file.*;
import com.remobile.contacts.*;
import com.remobile.zip.RCTZipPackage;
import com.rnfs.RNFSPackage;

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    private RCTImagePickerPackage mImagePickerPackage;
    private RCTCameraPackage mCameraPackage;
    private RCTSqlitePackage mSqlitePackage;
    private RCTContactsPackage mContactsPackage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);

        mImagePickerPackage = new RCTImagePickerPackage(this);
        mCameraPackage = new RCTCameraPackage(this);
        mSqlitePackage = new RCTSqlitePackage(this);
        mContactsPackage = new RCTContactsPackage(this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new RCTDesPackage())
                .addPackage(new RCTSplashScreenPackage(this))
                .addPackage(mImagePickerPackage)
                .addPackage(mCameraPackage)
                .addPackage(mSqlitePackage)
                .addPackage(mContactsPackage)
                .addPackage(new RNFSPackage())
                .addPackage(new RCTZipPackage())
                .addPackage(new RCTDialogsPackage(this))
                .addPackage(new RCTFilePackage(this))
                .addPackage(new RCTToastPackage())
                .addPackage(new RCTFileTransferPackage())
                .addPackage(new RCTDateTimePickerPackage(this))
                .addPackage(new RNDeviceInfo())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "KitchenSink", null);

        setContentView(mReactRootView);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onResume(this, this); 
        }
    }

    @Override
    protected  void onDestroy() {
        super.onDestroy();
        mSqlitePackage.onDestroy();
    }

    @Override
    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mImagePickerPackage.onActivityResult(requestCode, resultCode, data);
        mCameraPackage.onActivityResult(requestCode, resultCode, data);
        mContactsPackage.onActivityResult(requestCode, resultCode, data);
    }
}
