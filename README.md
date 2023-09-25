# React Native - Geolife Mobile App


## Setup instructions

### 1. Clone Repository

### 2. Install all dependencies

```sh
# navigate to app directory

npm install
```
### 3. Build Android APK
```sh
# Open terminal

1. npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

2. cd android
 
3. gradlew assembleDebug 

4. gradlew bundleRelease //for Production bundle build only this command run in cd folder skip 1 3 steps
```
### 3. running app on emulator 
```
npx react-native run-android
