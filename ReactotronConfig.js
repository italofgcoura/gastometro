import Reactotron from 'reactotron-react-native';

import { NativeModules, AsyncStorage } from 'react-native';
// import url from 'url';

// const {hostname} = url.parse(NativeModules.SourceCode.scriptURL);
// console.log(hostname); 

Reactotron
.setAsyncStorageHandler(AsyncStorage)
.configure({host: '192.168.1.5'})  
.useReactNative()
.connect();