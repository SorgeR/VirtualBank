#**React Native Starter Setup**

1. Start with the Create-React-Native-App from [https://github.com/react-community/create-react-native-app](https://github.com/react-community/create-react-native-app) like:  
   ```
   $ npm i -g create-react-native-app
   $ create-react-native-app my-project --scripts-version=react-native-scripts-ts  
   $ cd my-project
   ```

2. Run `npm run eject` - it moves create-react-app’s configuration files and dev/build/test scripts into you app directory.

###Development setup guide for Windows
1. Download and install `Node.js` and `npm` globally
2. Download Android Studio (Have Virtual Devices enabled during installation)
3. In Android Studio -> Configure -> SDK Manager:
   1. Install Android 8.0
   2. Google USB Driver
4. Install Java SDK
5. Set `JAVA_HOME` environment variable to point to the path of your Java installation
6. Add `{ANDROID-SDK-INSTALLATION-DIRECTORY}\platform-tools` to the `PATH` environment variable
7. Add `{ANDROID-SDK-INSTALLATION-DIRECTORY}` as the `ANDROID_HOME` environment variable
8. Run `npm install react-native-cli -g`
9. Run `npm install react-native`
10. Inside the React Native project's folder run `npm install`
11. Open Android Studio > Create virtual device and run it
12. Run `npm start` or `react-native run-android` to run your project.
13. Create a folder called `app` in the root of your application, and put your application code in there.
    1. Create a file called `App.tsx` in the `app` folder, and cut the contents of `/App.tsx` into in
    2. Inside `/App.tsx`, import and export your `App` component from `/app/App.tsx`

###React Native Component Libraries
1. You can use the *default native components* from [https://facebook.github.io/react-native/docs/components-and-apis.html](https://facebook.github.io/react-native/docs/components-and-apis.html)
2. You can also use *NativeBase* for additional components from [https://docs.nativebase.io/Components.html#Components](https://docs.nativebase.io/Components.html#Components)

###Working with Redux
1. Run `npm install --save redux react-redux`